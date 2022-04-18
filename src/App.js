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
    this.handleFlag = this.handleFlag.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      loading: false
    })
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
                isHidden: true,
                isMine: false,
                isFlagged: false,
                adjacentMines: 8,
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
    
    // set cell values
    for (const [key, cell] of Object.entries(grid)) {
      
      if (cell.isMine) { 
        cell.value = 'X' 
      } else {
        const x = cell.row
        const y = cell.col
        
        const neighbors = {
          'north': [x - 1, y],
          'northEast': [x - 1, y + 1],
          'east': [x, y + 1],
          'southEast': [x + 1, y + 1],
          'south': [x + 1, y],
          'southWest': [x + 1, y - 1],
          'west': [x, y - 1],
          'northWest': [x - 1, y - 1],
        }
        
        for (const [neighbor, coordinates] of Object.entries(neighbors)) {
          const neighborX = coordinates[0]
          const neighborY = coordinates[1]

          for (let i = 0; i < grid.length; i++) { 

            if (grid[i].row === neighborX && grid[i].col === neighborY && !grid[i].isMine) {
              grid[i].adjacentMines--
            }

          }
  
        }
        
        // top and bottom rows
        if ( x === 1 || x === 9 ) {cell.adjacentMines = cell.adjacentMines -3 }
        // left and right cols
        if ( y === 1 || y === 9 ) {cell.adjacentMines = cell.adjacentMines -3 }
        // corners
        if ( x === 1 && y === 1 ||
             x === 1 && y === 9 ||
             x === 9 && y === 1 ||
             x === 9 && y === 9 ) {
          cell.adjacentMines = cell.adjacentMines + 1 
        }
         
      }
      
    }

    this.setState({
      grid: grid,
      gameStatus: "ready"
    })

  }

  resetGame(event) {
    event.preventDefault()
    console.log("game started!")
    this.initGrid()
  }

  handleFlag(event, cell) {
      event.preventDefault()
      let newMinesFlagged = this.state.minesFlagged
      let newGrid = this.state.grid
      if (this.state.grid[cell.key - 1].isFlagged) {
        newGrid[cell.key - 1].isFlagged = false
        newMinesFlagged--
      } else {
        newGrid[cell.key - 1].isFlagged = true
        newMinesFlagged++
      }
      this.setState({
          grid: newGrid,
          minesFlagged: newMinesFlagged
      })
  }

  handleCellMouseDown(event, cell) {
      event.preventDefault()
      let newGameStatus = this.state.gameStatus
      if (cell.isHidden) {newGameStatus = "selecting" }
      this.setState({
          gameStatus: newGameStatus 
      })
  }

  handleCellClick(event, cell) {
      event.preventDefault()

      let newGameStatus = this.state.gameStatus
      if (cell.isMine) {
          newGameStatus = "lose"
          console.log("game over")
      } else {
        newGameStatus = "ready"
      }

      let newGrid = this.state.grid
      newGrid[cell.key - 1].isHidden = false
      newGrid[cell.key - 1].value = cell.adjacentMines
      if (cell.adjacentMines === 0) {
        console.log("reveal all surrounding cells")
        newGrid[cell.key - 2].isHidden = false
        newGrid[cell.key].isHidden = false
        newGrid[cell.key - 2 - 9].isHidden = false
        newGrid[cell.key - 1 - 9].isHidden = false
        newGrid[cell.key - 9].isHidden = false
        newGrid[cell.key - 1].isHidden = false
        newGrid[cell.key - 1 + 8].isHidden = false
        newGrid[cell.key - 1 + 1 + 8].isHidden = false
        newGrid[cell.key - 1 + 2 + 8].isHidden = false
        // console.log()
        console.log(newGrid[cell.key-1])
        // console.log(Math.floor(newGrid[cell.key - 1].key % 9))
      }
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
            mines={this.state.mines} 
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
          handleFlag={this.handleFlag}
        />
      </article>
    )
  }
}

export default App
