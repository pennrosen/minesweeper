import React from 'react';

function Cell(props) {

    const cellValue = () => {
        if (!this.props.value.isRevealed){
            return this.props.value.isFlagged ? "🚩" : null;
        }
        if (this.props.value.isMine) {
            return "💣";
        }
        if(this.props.value.neighbor === 0 ){
            return null;
        }
        return this.props.value.neighbor;
    }
    

    let className = "cell" + (this.props.value.isRevealed ? "" : " hidden") + (this.props.value.isMine ? " is-mine" : "") + (this.props.value.isFlagged ? " is-flag" : "");

    return( 
        <div
            className={className} 
            onClick={this.props.onClick} 
            onContextMenu={this.props.cMenu}
        >
            {cellValue}
        </div>
    )
}

export default Cell 