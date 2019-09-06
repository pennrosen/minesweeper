import React from "react"

function ResetButton(props) {

    const faceHappy = "/images/faceHappy.png",
          faceWorried = "/images/faceWorried.png", 
          faceDead = "/images/faceDead.png", 
          faceCool = "/images/faceCool.png"; 

    return(
        <div>
            <img 
                src={faceHappy} 
                alt={":)"}
                onClick={event => props.startGame(event)}
                />
        </div>
    )
}

export default ResetButton