import React from "react"

function Grid(props) {

    const { columns, grid } = props

    const cellStyle = (cell) => ({
        border: "1px solid #7b7b7b",
        backgroundColor: cell.isMine ? "red" : "#bdbdbd",
        boxShadow: "none" 
    })

    let gameBoard = grid.map(cell => {

        return (
            <div 
                className={"cell " + (cell.col === columns ? "last-col" : "") }
                row={cell.row}
                col={cell.col}
                key={cell.key}
                style={!cell.hidden ? cellStyle(cell) : null}
                onMouseDown={event => props.handleCellMouseDown(event, cell)}
                onClick={event => props.handleCellClick(event, cell)}
            >
                {/* {cell.value} */}
                {cell.isMine ? "X" : cell.value}
            </div> 
        )
    })

    return(
        <section className="game-grid">
            {gameBoard}
        </section>
    )
}

export default Grid