import './App.css';
import React, { useState } from 'react';
import GameOverModal from './GameOver';

const vocabulary = [
  {
    subject: "fruits",
    words: ["apple", "bannana", "grapes"],
  },
  {
    subject: "vegetables",
    words: ["tomato", "carrot",  "avocado", "lettuce"],
  }, {
    subject: "drinks",
    words: ["water", "soda", "juice"],
  },
]

const allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


function App() {

  const [chosenWord, setChosenWord] = React.useState("")
  const [chosenSubject, setChosenSubject] = React.useState("")
  const [clickedLetters, setClickedLetters] = React.useState([])
  const [show, setShow] = useState(false)

  const gettingRandomWordAndSubject = () => {

    let numberOfSubjects = vocabulary.length;
    let randomSubjectIndex = Math.floor(Math.random() * numberOfSubjects);
    let numberOfWordsInRandomSelectedSubject = vocabulary[randomSubjectIndex].words.length
    let randomWordIndex = Math.floor(Math.random() * numberOfWordsInRandomSelectedSubject);

    let chosenRandomWord = vocabulary[randomSubjectIndex].words[randomWordIndex];
    let chosenRandomSubject = vocabulary[randomSubjectIndex].subject

    setChosenWord(chosenRandomWord)
    setChosenSubject(chosenRandomSubject)
  }

  const coloringLettersBoard = (letter) => {

    if (chosenWord.includes(letter) && clickedLetters.includes(letter)) {
      return "rightLetter"

    } else if (!chosenWord.includes(letter) && clickedLetters.includes(letter)) {
      return "wrongLetter"

    } else {
      return "notChosenYet"
    }
  }

  const choosingPicture = () => {

    let numberOfErrors = clickedLetters.filter(letter => !chosenWord.includes(letter)).length;

    switch(numberOfErrors) {
      case 0:
        return "/pics/0.png"

      case 1:
        return "/pics/1.png"

      case 2:
        return "/pics/2.png"

      case 3:
        return "/pics/3.png"

      case 4:
        return "/pics/4.png"

      case 5:
        return "/pics/5.png"

      default:
        return "/pics/6.png"
    }
  }
  
  const newGameClicking = () => {
    setClickedLetters([]);
    gettingRandomWordAndSubject()
  }

  const handleKeyPress = (event) => {
    setClickedLetters(existingClickedLetters => {
      if (existingClickedLetters.includes(event.key) || !allLetters.includes(event.key)) {
        return existingClickedLetters
      }
      return [...existingClickedLetters, event.key]
      })
    }



  React.useEffect( () => {
    gettingRandomWordAndSubject()
    document.addEventListener('keydown', handleKeyPress)
  }, [])

  
  
  
  return (
    <div className="App">

      <div className='upperPart'>

        <div className='graphBoard'>

          <img src={choosingPicture()} alt="hangman" width="500" height="600"></img>

          <button onClick={ () => setShow(true) }>Show modal</button>
          <GameOverModal show={show} onClose={ () => setShow(false) } title="GAME OVER"  />

        </div>

        <div id="guessPlusButton">
          <div className='guessBoard'>
            <p>subject: {chosenSubject} </p>
            <div className='guessLines'>
              {
                chosenWord.split("").map( (l, i) => (
                  <p key={`${l}-${i}`}>
                      {clickedLetters.includes(l) ? l : "_"} 
                  </p>
                ))
              }
            </div>

          </div>

          <button id="newGameButton" onClick={newGameClicking}>New Game</button>
        </div>
      </div>

      <div className='lettersBoard'>

        {allLetters.map( (letter) => (
          
          <button
            key={letter}
            id={letter} 
            onClick= { () => {
              setClickedLetters(existingClickedLetters => {
                if (existingClickedLetters.includes(letter)) {
                  return existingClickedLetters
                }
                return [...existingClickedLetters, letter]
                })
              }}
            className= {coloringLettersBoard(letter)}
          >
          {letter} 
          </button> 
        ) )}
        
      </div>

    </div>
  );
}

export default App;


// add GameOverModal to render when pic 6 is being renderd + block user from continue playing