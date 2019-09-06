import React from "react"

function Grid(props) {

    let grid = Array(props.gridSize).fill(Array(props.gridSize))

    let gameBoard = grid.map(row => {
        return (
            <tr 
                className={row.length}
                rowNumber={row.length}
            >
                {
                    grid.map(col => {
                        return (
                            <td className={col}>
                               {props.gridSize} 
                            </td>
                        )
                    }) 
                }
            </tr>
        )

    })

    return(
        <div>
            {gameBoard}
        </div>
    )
}

export default Grid