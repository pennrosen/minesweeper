import React, { Component } from "react"
import MineCounter from "./components/mineCounter/MineCounter"
import TimeCounter from "./components/timeCounter/TimeCounter"
import ResetButton from "./components/resetButton/ResetButton"
import Grid from "./components/grid/Grid"
import "./styles/App.scss"

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      gameStarted: false,
      gridSize: 9,
      secondsSinceStart: 0,
      totalMines: 10,
      minesFlagged: 0
    }
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      loading: false,
      gameStarted: false,
      gridSize: 9,
      secondsSinceStart: 0,
      totalMines: 10,
      minesFlagged: 0
    })
  }

  startGame(event) {
    event.preventDefault()
    console.log("game started!")
    this.setState({
      gameStarted: true
    })
    // TimeCounter()
  }

  render() {
    return (
      <article className="App">
        <section class="game-info">
          <MineCounter />
          <ResetButton 
            startGame={this.state.startGame}
          />
          <TimeCounter />
        </section>
        <section class="game-grid">
          <Grid 
            gridSize={this.state.gridSize}
          />
        </section>
      </article>
    )
  }
}

export default App
