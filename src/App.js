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
      loading: true,
      rows: 9,
      columns: 9,
      mines: 10,
      minesFlagged: 0,
      secondsSinceStart: 0,
      grid: []
    }

    const { rows, columns, mines } = this.state

    // create a grid of cells 
    const grid = []
    for (let row = 1; row <= rows; row++) {

        for (let col = 1; col <= columns; col++) {
            grid.push({
                key: grid.length + 1, 
                row: row,
                col: col,
                hidden: true,
                isMine: false,
                adjacentMines: 0,
                flagged: false
            })
        }

    }

    // lay mines
    for (let i = 0; i < mines; i++) {
        let rand = Math.floor(Math.random() * grid.length);
        if (grid[rand].isMine === false) {
            grid[rand].isMine = true
        } else {
            i--
        } 
    }
    this.state.grid = grid
    this.resetGame = this.resetGame.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      loading: false,
      // gameStatus: "ready",
      // grid: []
    })
  }

  resetGame(event) {
    event.preventDefault()
    console.log("game started!")
    this.setState({
      gameStarted: true,
      secondsSinceStart: 0
    })
    // TimeCounter()
  }

  handleCellClick(event, cell) {
      event.preventDefault()
      console.log("x: " + cell.col)
      console.log("y: " + cell.row)
      if (cell.isMine) {
          console.log("game over")
      }
      let newGrid = this.state.grid
      newGrid[cell.key - 1].hidden = false
      this.setState({
          grid: newGrid 
      })
  }

  render() {
    return (
      <article className="minesweeper">
        <section className="game-info">
          <MineCounter 
            minesFlagged={this.state.minesFlagged} 
          />
          <ResetButton 
            resetGame={this.resetGame}
          />
          <TimeCounter 
            secondsSinceStart={this.state.secondsSinceStart} 
          />
        </section>
        <Grid 
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          grid={this.state.grid}
          handleCellClick={this.handleCellClick}
        />
      </article>
    )
  }
}

export default App
