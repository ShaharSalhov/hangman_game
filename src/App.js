import './App.css';
import React, { useState } from 'react';
import GameOverModal from './GameOver';
import NewGameButton from './NewGame';

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
  const [imgSrc, setImgSrc] = useState("")

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

  React.useEffect( () => {

      let numberOfErrors = clickedLetters.filter(letter => !chosenWord.includes(letter)).length;
      console.log(window.location.pathname)
      switch(numberOfErrors) {
        case 0:
          setImgSrc(`${window.location.pathname}pics/0.png`)
          break; 
  
        case 1:
          setImgSrc(`${window.location.pathname}pics/1.png`) 
          break; 
  
        case 2:
          setImgSrc(`${window.location.pathname}pics/2.png`) 
          break; 
  
        case 3:
          setImgSrc(`${window.location.pathname}pics/3.png`) 
          break; 
  
        case 4:
          setImgSrc(`${window.location.pathname}pics/4.png`) 
          break; 
  
        case 5:
          setImgSrc(`${window.location.pathname}pics/5.png`) 
          break; 
  
        default:
          setShow(true);
          setImgSrc(`${window.location.pathname}pics/6.png`) 
      }
    
    
  }, [clickedLetters, chosenWord])
  
  
  
  return (
    <div className="App">

      <div className='upperPart'>

        <div className='graphBoard'>

          <img src={imgSrc} alt="hangman" width="500" height="600"></img>

          <GameOverModal 
            show={show} 
            onClose={ () => {
              setShow(false)
              newGameClicking()
              } } 
            title="GAME OVER" 
          />

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

          <NewGameButton onClick={newGameClicking} />
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