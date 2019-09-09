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

    this.resetGame = this.resetGame.bind(this)
    this.handleCellMouseDown = this.handleCellMouseDown.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      loading: false
    })
    this.initGrid()
  }

  resetGame(event) {
    event.preventDefault()
    console.log("game started!")
    this.initGrid()
  }

  initGrid() {

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
                flagged: false,
                value: ""
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

    this.setState({
      grid: grid,
      gameStatus: "ready"
    })

  }

  handleCellMouseDown(event, cell) {
      event.preventDefault()
      let newGameStatus = this.state.gameStatus
      if (cell.hidden) {newGameStatus = "selecting" }
      this.setState({
          gameStatus: newGameStatus 
      })
  }

  handleCellClick(event, cell) {
      event.preventDefault()
      console.log("x: " + cell.col)
      console.log("y: " + cell.row)

      let newGameStatus = this.state.gameStatus
      if (cell.isMine) {
          newGameStatus = "lose"
          console.log("game over")
      } else {
        newGameStatus = "ready"
      }

      let newGrid = this.state.grid
      newGrid[cell.key - 1].hidden = false
      newGrid[cell.key - 1].value = cell.key
      this.setState({
          grid: newGrid,
          gameStatus: newGameStatus 
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
            gameStatus={this.state.gameStatus}
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
          gameStatus={this.state.gameStatus}
          handleCellClick={this.handleCellClick}
          handleCellMouseDown={this.handleCellMouseDown}
        />
      </article>
    )
  }
}

export default App
