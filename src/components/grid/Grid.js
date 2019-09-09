import React from "react"

function Grid(props) {

    const { rows, columns, mines, grid } = props

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
                // onClick={() => handleCellClick(cell)}
                onClick={event => props.handleCellClick(event, cell)}
            >
                {/* {cell.key} */}
                {cell.isMine ? "X" : ""}
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