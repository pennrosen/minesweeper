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
    this.initGrid()
    this.setState({
      minesFlagged: 0,
      gameStatus: "ready"
    })
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
      
      let newGameStatus = this.state.gameStatus
      if (newMinesFlagged === 10) {
        newGameStatus = "win"
      }
      
      this.setState({
          grid: newGrid,
          minesFlagged: newMinesFlagged,
          gameStatus: newGameStatus 
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
          // TODO: revealMines()
          // TODO: freezeGame()
      } else {
        newGameStatus = "ready"
      }

      let newGrid = this.state.grid
      const gridNum = cell.key - 1
      newGrid[gridNum].isHidden = false
      newGrid[gridNum].value = cell.adjacentMines
      
      if (cell.adjacentMines === 0) {
        // reveal all surrounding cells
        const rowLength = 9

        let center = newGrid[gridNum]
        let north = newGrid[gridNum - rowLength]
        let northEast = newGrid[gridNum - rowLength + 1]
        let east = newGrid[gridNum + 1]
        let southEast = newGrid[gridNum + 1 + rowLength]
        let south = newGrid[gridNum + rowLength]
        let southWest = newGrid[gridNum + rowLength - 1]
        let west = newGrid[gridNum - 1]
        let northWest = newGrid[gridNum - 1 - rowLength]

        // middle of grid
        if (cell.row > 1  && cell.row < 9 && cell.col > 1 && cell.col < 9) {
          center.isHidden = false
          north.isHidden = false
          northEast.isHidden = false
          east.isHidden = false
          southEast.isHidden = false
          south.isHidden = false
          southWest.isHidden = false
          west.isHidden = false
          northWest.isHidden = false
        }
        // top row, not corners
        if (cell.row === 1 && cell.col > 1 && cell.col < 9) {
          center.isHidden = false
          east.isHidden = false
          southEast.isHidden = false
          south.isHidden = false
          southWest.isHidden = false
          west.isHidden = false
        }
        // top row, left corner
        if (cell.row === 1 && cell.col === 1) {
          center.isHidden = false
          east.isHidden = false
          southEast.isHidden = false
          south.isHidden = false
        }
        // top row, right corner
        if (cell.row === 1 && cell.col === 9) {
          center.isHidden = false
          west.isHidden = false
          southWest.isHidden = false
          south.isHidden = false
        }
        // bottom row, not corners
        if (cell.row === 9 && cell.col > 1 && cell.col < 9) {
          center.isHidden = false
          east.isHidden = false
          northEast.isHidden = false
          north.isHidden = false
          northWest.isHidden = false
          west.isHidden = false
        }
        // bottom row, left corner
        if (cell.row === 9 && cell.col === 1) {
          center.isHidden = false
          east.isHidden = false
          northEast.isHidden = false
          north.isHidden = false
        }
        // bottom row, right corner
        if (cell.row === 9 && cell.col === 9) {
          center.isHidden = false
          west.isHidden = false
          northWest.isHidden = false
          north.isHidden = false
        }
        // left column, not corners
        if (cell.col === 1 && cell.row > 1 && cell.row < 9) {
          center.isHidden = false
          northEast.isHidden = false
          north.isHidden = false
          east.isHidden = false
          southEast.isHidden = false
          south.isHidden = false
        }
        // right column, not corners
        if (cell.col === 9 && cell.row > 1 && cell.row < 9) {
          center.isHidden = false
          north.isHidden = false
          northWest.isHidden = false
          south.isHidden = false
          southWest.isHidden = false
          west.isHidden = false
        }

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
