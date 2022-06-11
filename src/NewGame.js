import React from "react";
import './NewGame.css';

 function NewGameButton( { onClick }) {

    return (
        <button className="newGameButton" onClick={onClick}>New Game</button>
    );
  }

  export default NewGameButton;