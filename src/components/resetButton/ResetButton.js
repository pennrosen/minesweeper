import React from "react"

function ResetButton(props) {

    const faceHappy = "./images/faceHappy.png",
          faceWorried = "./images/faceWorried.png", 
          faceCool = "./images/faceCool.png", 
          faceDead = "./images/faceDead.png"; 

    let face = ""
    switch (props.gameStatus) {
        case "ready":
            face = faceHappy 
            break;
        case "selecting":
            face = faceWorried 
            break;
        case "win":
            face = faceCool 
            break;
        case "lose":
            face = faceDead 
            break;
        default:
            face = faceHappy
            break;
    }

    return(
        <div>
            <img 
                className="reset-button"
                src={face} 
                alt={":)"}
                onClick={event => props.resetGame(event)}
                />
        </div>
    )
}

export default ResetButton