import React from "react"

function MineCounter(props) {

    return(
        <div>
            {props.mines - props.minesFlagged}
        </div>
    )
}

export default MineCounter