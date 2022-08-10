# The Game Sorter

Made with ❤ using React.js and d3.js

Original Repo: https://github.com/two-zoomers-and-a-boomer/game_sorter_public

- Created with teammates @jugnugs and @Jmont99 in Fall 2020.
- Re-deployed using Node version 16 & Express middleware to ping the IGDB API.

## Local Setup

### Front-End Setup

`git clone https://github.com/liamkyoung/the_game_sorter`
`cd the_game_sorter/client`
`npm install`

**Create a new file named ".env". Add the following lines inside of it**

```
REACT_APP_API_GATEWAY_GAMES_ENDPOINT=http://localhost:5000/gameTitles
REACT_APP_API_GATEWAY_MULTI_ENDPOINT=http://localhost:5000/similarGames
```

- Note: Change http://localhost:5000/ to a different endpoint if hosting server not from your local machine.

`npm start`

### Back-end setup

From `./the_game_sorter`...
`cd server`
`npm install`

**Create a new file named ".env". Add the following lines inside of it**

```
REACT_APP_API_GATEWAY_GAMES_ENDPOINT=https://api.igdb.com/v4/games
REACT_APP_API_GATEWAY_MULTI_ENDPOINT=https://api.igdb.com/v4/multiquery
REACT_APP_CLIENT_ID=your_client_id
REACT_APP_TOKEN_AUTH=your_auth_token
```

Client Id and Auth Token can be created by:

1. Registering your application with Twitch: https://dev.twitch.tv/console/apps/create
2. Generating Client ID and Secret

Full instructions for Getting a ClientID and AUTH: https://api-docs.igdb.com/#about

Finally:
`npm start`
