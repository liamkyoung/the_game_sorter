import React from 'react';
import axios from 'axios';
import Interface from './GUI.js';
import Tooltip from './Tooltip.js'
import { Graph } from "react-d3-graph";
import placeholder from '../images/placeholder.png';
import cloneDeep from 'clone-deep';

const GAMES_ENDPOINT = process.env.REACT_APP_API_GATEWAY_GAMES_ENDPOINT;
const MULTI_ENDPOINT = process.env.REACT_APP_API_GATEWAY_MULTI_ENDPOINT;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const TOKEN_AUTH = process.env.REACT_APP_TOKEN_AUTH;


class Game {
  constructor(game) {
    this.name = game.name;
    this.genres = (game.genres) ? game.genres.map((i)=>i.name) : [];
    this.cover = (game.cover) ? game.cover.url : placeholder;
    this.similarGames = (game.similar_games) ? game.similar_games.map((i)=>i.name) : [];
    this.rating = game.total_rating || 0;
    this.platforms =  (game.platforms) ? game.platforms.map((i)=>i.name) : [];
  }
}

const initialState = {
  searchedGame: '',
  gameTitles: [],
  games: [],
  connections: [],
  hoveredNode: null
}

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = cloneDeep(initialState);
    this.graphConfig = {
      "width": 900,
      "height": 850,
      "automaticRearrangeAfterDropNode": true,
      "collapsible": false,
      "directed": false,
      "focusAnimationDuration": 0.75,
      "freezeAllDragEvents": false,
      "focusZoom": 1,
      "highlightDegree": 1,
      "highlightOpacity": 1,
      "linkHighlightBehavior": false,
      "maxZoom": 8,
      "minZoom": 0.1,
      "nodeHighlightBehavior": true,
      "panAndZoom": true,
      "staticGraph": false,
      "staticGraphWithDragAndDrop": false,
      "d3": {
        "alphaTarget": 0.05,
        "gravity": -400,
        "linkLength": 100,
        "linkStrength": 1,
        "disableLinkForce": false
      },
      "node": {
        "color": "#ffffff",
        "fontColor": "#394e70",
        "fontSize": 14,
        "fontWeight": "bold",
        "highlightColor": "#46618b",
        "highlightFontSize": 18,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "white",
        "highlightStrokeWidth": "SAME",
        "labelProperty": "id",
        "labelPosition": "bottom",
        "mouseCursor": "pointer",
        "opacity": 0.9,
        "renderLabel": true,
        "size": 500,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "svg": "",
        "symbolType": "circle"
      },
      "link": {
        "color": "#ffffff",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 0.6,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
      }
    };
    this.makeRequest = this.makeRequest.bind(this);
    this.getSearchedGame = this.getSearchedGame.bind(this);
    this.getSimilarGames = this.getSimilarGames.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.onMouseOverNode = this.onMouseOverNode.bind(this);
    this.onMouseOutNode = this.onMouseOutNode.bind(this);
  }

  makeRequest(url, dataParams) {
    return (
      axios({
        url: `${url}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': `${CLIENT_ID}`,
          'Authorization': `${TOKEN_AUTH}`,
        },
        data: `${dataParams}`
      })
    )
  }

  async getSearchedGame(name) {
    try {
      // reset game data stored in client
      const copy = cloneDeep(initialState);
      await this.setState(copy);
      let games = this.state.games;
      let gameTitles = this.state.gameTitles;
      const url = GAMES_ENDPOINT;
      const dataParams = `fields name,similar_games.name,cover.url,genres.name,platforms.name,total_rating; search "${name}";`;
      const response = await this.makeRequest(url, dataParams);
      gameTitles = this.state.gameTitles;
      console.log("Success");
      const searchedGame = new Game(response.data[0]);
      games.push(searchedGame);
      gameTitles.push(searchedGame.name);
      this.setState({
        games: games,
        gameTitles: gameTitles,
        searchedGame: searchedGame.name,
      });
      await this.getSimilarGames(searchedGame);
    } catch (err) {
      console.log("Failed");
      console.error(err);
    }
  }

  async getSimilarGames(searchedGame) {
    try {
      let games = this.state.games;
      let connections = this.state.connections;
      let gameTitles = this.state.gameTitles;

      // get similar game names of searched game
      const similarGames = searchedGame['similarGames']
      const url = MULTI_ENDPOINT;
      let dataParams = "";
      console.log(similarGames);

      // add connections between similar games
      similarGames.forEach((game) => {
        // do not add duplicate connections
        if (!this.state.connections.find(e => e.source === searchedGame.name && e.target === game)) {
          connections.push({
            source: searchedGame.name,
            target: game,
          });
        }
        // append query to request parameters
        dataParams = dataParams.concat(`
            query games "${game} info:" {
              fields name,similar_games.name,cover.url,genres.name,platforms.name,total_rating;
              where name = "${game}";
            };
        `);
      });
      const response = await this.makeRequest(url, dataParams);
      console.log(response.data);

      // add information for similar games to Client state
      response.data.forEach((snip) => {
        const game = snip.result[0];
        // do not add duplicate games
        if (!this.state.gameTitles.includes(game.name)) {
          games.push(new Game(game));
          gameTitles.push(game.name);
        }
      });
      await this.setState({
        games: games,
        connections: connections,
      });

    } catch (err) {
      console.log("Failed");
      console.error(err);
    }
  }

  onNodeClick(e) {
    const gameData = e.target.__data__;
    const game = {
      name: gameData.id,
      genres: gameData.genres,
      cover: gameData.cover,
      similarGames: gameData.similarGames,
      rating: gameData.rating,
      platforms: gameData.platforms
    }
    this.getSimilarGames(game);
  }

  componentDidMount() {
    console.log('App mounted');
  }

  onClickNode(nodeId) {
    let found = this.state.games.find(e => e.name === nodeId);
    console.log(found);
    this.getSimilarGames(found);
  };

  onMouseOverNode(nodeId) {
    let found = Array.from(this.state.games).find(e => e.name === nodeId);
    if (!found) {
      return;
    } else {
      this.setState({hoveredNode: found});
    }
  }

  onMouseOutNode(nodeId) {
    let found = Array.from(this.state.games).find(e => e.name === nodeId);
    if (!found) {
      return;
    } else {
      this.setState({hoveredNode: null});
    }
  }


  render() {
    // use default data for graph if no games stored yet in Client
    let data;
    if (this.state.games.length !== 0) {
      data = {
        nodes: this.state.games.map((game) => {
          return ({
            id: game.name,
            svg: game.cover
          })
        }),
        links: this.state.connections
      }
    } else {
      data = {
        nodes: [{ id: "Search to start" }, { id: "Game 1" }, { id: "Game 2" }],
        links: [
          { source: "Search to start", target: "Game 1" },
          { source: "Search to start", target: "Game 2" },
        ],
      };
    }

    return (
      <div className="wrapper">
        <div id="left-bar">
        <Interface
          getSearchedGame = {this.getSearchedGame}
          game = {this.state.searchedGame}
          games = {this.state.games}
        />
        </div>
        <div id="right-visuals">
          <Graph 
            id="graph-id" 
            data={data}
            config={this.graphConfig}
            onClickNode={this.onClickNode}
            onMouseOverNode={this.onMouseOverNode}
            onMouseOutNode={this.onMouseOutNode}
          />         
          {this.state.hoveredNode ? 
          <Tooltip
            name={this.state.hoveredNode.name}
            genres={this.state.hoveredNode.genres}
            rating={this.state.hoveredNode.rating}
            platforms={this.state.hoveredNode.platforms}
          /> : null
          }
        </div>
      </div>
    );
  }
}

export default Client;