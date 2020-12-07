import React, {Component} from 'react'
import '../Tooltip.css';
import * as d3 from 'd3'

class Tooltip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            styles: {
               left: '1400px',
               top:  '250px'
            }
        }
        this.ratingText = ''
        this.genreText = ''
        this.platformsText = ''
        this.finalFormatting = this.finalFormatting.bind(this)
        this.formatState = this.formatState.bind(this)
        this.calculateColor = this.calculateColor.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
      }

    finalFormatting() {
        //console.log(`${this.state.name}, ${this.state.rating}`)
        return (
            <div className = "tooltip" style = {this.state.styles}>
                <h4>{this.props.name}</h4>
                <b><h2>Rating: </h2></b><h1 style={{color: this.calculateColor()}}>{this.ratingText}</h1> 
                <b><h2>Genres: </h2></b><h3>{this.genreText}</h3> 
                <b><h2>Platforms: </h2></b><h3>{this.platformsText}</h3>
            </div>
        )
    }  

    calculateColor() {
      var sizeScale = d3.scaleLinear()
      .domain([30, 60, 100])
      .range(['#A00000','#FFFF00', '#00FF2E'])
      var color = sizeScale(this.props.rating).toString()

      if (!this.props.rating)
        return '#f00'
      else
        return color
    }

    componentWillUnmount() {
      
    }

    formatState(rating, genres, platforms) {
        if (!rating || rating === 0)
          this.ratingText = 'N/A'
        else
          this.ratingText = Math.floor(this.props.rating).toString()

        for (let i = 0; i < this.props.genres.length; i++){
          if (i !== genres.length - 1)
            this.genreText += this.props.genres[i] + ', '
          else
            this.genreText += this.props.genres[i]
        }
      
        for (let i = 0; i < this.props.platforms.length; i++) {
          if (i !== platforms.length - 1)
            this.platformsText += this.props.platforms[i] + ', '
          else
            this.platformsText += this.props.platforms[i]
        }
    }
    render() {
        //console.log(this.props.rating, this.props.genres, this.props.platforms)
        this.formatState(this.props.rating, this.props.genres, this.props.platforms)
        return this.finalFormatting()

    }

}

export default Tooltip;