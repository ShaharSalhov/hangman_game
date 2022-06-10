import React from 'react';
import './GameOver.css';

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
              <button className='button' onClick={props.onClose}> Close </button>
          </div>

        </div>

      </div>
    );
  }

  export default GameOverModal;