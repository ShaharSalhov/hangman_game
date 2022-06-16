import React from 'react';
import './GameOver.css';
import NewGameButton from './NewGame';

function GameOverModal( { show, isWining, title, onClose} ) {

  if (!show) {
      return null
  }

  return (

    <div className='modal'>

      <div className='modalContent'>

        <h4 className={title}> { isWining ? "Excellent Job!" : "GAME OVER" } </h4>

          <p className='modalText'> { isWining ? "You won the game!" : "better luck next time" } </p>

            <NewGameButton onClick={onClose}/>

      </div>

    </div>
  );
}

export default GameOverModal;