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

            <div className='modalHeader'>
                <h4 className={title}> { isWining ? "Excellent Job!" : "GAME OVER" } </h4>
            </div>

          <div className="children">
            { isWining ? "You won the game!" : "better luck next time" }
          </div>

          <div className='modalFooter'>
              <NewGameButton onClick={onClose}/>
          </div>

        </div>

      </div>
    );
  }

  export default GameOverModal;