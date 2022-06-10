import React from 'react';
import './GameOver.css';
import NewGameButton from './NewGame';

 function GameOverModal(props) {

    if (!props.show) {
        return null
    }

    return (
      <div className='modal'>

        <div className='modalContent'>

            <div className='modalHeader'>
                <h4 className={props.title}>GAME OVER</h4>
            </div>

          <div className={props.children}>
              this is modal body
          </div>

          <div className='modalFooter'>
              <NewGameButton onClick={props.onClose}/>
          </div>

        </div>

      </div>
    );
  }

  export default GameOverModal;