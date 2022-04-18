import React from 'react'

function Grid(props) {

    const { columns, grid } = props

    const cellStyleVisible = (cell) => ({
        border: '1px solid #7b7b7b',
        backgroundColor: cell.isMine ? 'red' : '#bdbdbd',
        color: cell.adjacentMines === 1 ? 'rgb(0,0,255)'
             : cell.adjacentMines === 2 ? 'rgb(0,123,0)'
             : cell.adjacentMines === 3 ? 'rgb(255,0,0)'
             : cell.adjacentMines === 4 ? 'rgb(0,0,123)'
             : cell.adjacentMines === 5 ? 'rgb(123,0,0)'
             : cell.adjacentMines === 6 ? 'rgb(0,123,123)'
             : cell.adjacentMines === 7 ? 'rgb(0,0,0)'
             : cell.adjacentMines === 8 ? 'rgb(123,123,123)'
             : 'black',
        fontWeight: '900',
        boxShadow: 'none' 
    })

    const cellStyleHidden = (cell) => ({
        color: '#bdbdbd',
        content: 'none'
    })

    let gameBoard = grid.map(cell => {

        return (
            <div 
                className={'cell' + (cell.col === columns ? ' last-col' : '') + ((cell.isFlagged && cell.isHidden) ? ' flagged' : '')}
                row={cell.row}
                col={cell.col}
                key={cell.key}
                style={cell.isHidden ? cellStyleHidden(cell) : cellStyleVisible(cell)}
                onMouseDown={event => props.handleCellMouseDown(event, cell)}
                onClick={event => props.handleCellClick(event, cell)}
                onContextMenu={event => props.handleFlag(event, cell)}
            >
                {cell.isMine && !cell.isHidden ? '💣' : 
                 cell.adjacentMines === 0 ? '' :
                 cell.adjacentMines }
            </div> 
        )
    })

    return(
        <section className='game-grid'>
            {gameBoard}
        </section>
    )
}

export default Grid