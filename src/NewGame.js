import React from "react";
import './NewGame.css';

 function NewGameButton(props) {

    return (
        <button className="newGameButton" onClick={props.onClick}>New Game</button>
    );
  }

  export default NewGameButton;