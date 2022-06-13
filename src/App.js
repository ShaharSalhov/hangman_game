import './App.css';
import React, { useState } from 'react';
import GameOverModal from './GameOver';
import NewGameButton from './NewGame';
import myPackageJson from '../package.json';

const vocabulary = [
  {
    subject: "fruits",
    words: ["apple", "bannana","grapes", "apricot", "blackberries", "blueberries", "cherries", "clementine", "fig", "gooseberries", "kiwi", "grapefruit", "mango", "melon", "nectarine", "orange", "pear", "peach", "passion fruit", "physalis", "persimmon"],
  },
  {
    subject: "vegetables",
    words: ["tomato", "carrot",  "avocado", "lettuce", "artichoke", "asparagus", "beetroot", "bell pepper", "broccoli", "brussels sprouts", "cabbage", "lemon", "lime"],
  }, 
  {
    subject: "drinks",
    words: ["water", "soda", "juice", "wine", "coffee", "lemonade", "iced tea", "hot chocolate", "milkshake"],
  },
]

const allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


function App() {

  const [chosenWord, setChosenWord] = React.useState("")
  const [trimmedChosenWord, setTrimmedChosenWord] = React.useState("")
  const [chosenSubject, setChosenSubject] = React.useState("")
  const [clickedLetters, setClickedLetters] = React.useState([])
  const [show, setShow] = useState(false)
  const [imgSrc, setImgSrc] = useState(`${myPackageJson.homepage}/pics/0.png`)
  const [isWining, setIsWining] = useState(false)

  const gettingRandomWordAndSubject = () => {

    let numberOfSubjects = vocabulary.length;
    let randomSubjectIndex = Math.floor(Math.random() * numberOfSubjects);
    let numberOfWordsInRandomSelectedSubject = vocabulary[randomSubjectIndex].words.length
    let randomWordIndex = Math.floor(Math.random() * numberOfWordsInRandomSelectedSubject);

    let chosenRandomWord = vocabulary[randomSubjectIndex].words[randomWordIndex];
    let chosenRandomSubject = vocabulary[randomSubjectIndex].subject

    setChosenWord(chosenRandomWord)
    setTrimmedChosenWord(chosenRandomWord.replace(/\s/g, ''))
    setChosenSubject(chosenRandomSubject)
    setIsWining(false)
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

      if (chosenWord.length === 0) {
        return
      }
      
      let numberOfErrors = clickedLetters.filter(letter => !trimmedChosenWord.includes(letter)).length;
      let wining = trimmedChosenWord.split("").every((l) => clickedLetters.includes(l))

      if (wining) {
        setIsWining(true)
        setShow(true)

      } else {

        switch(numberOfErrors) {
          case 0:
            setImgSrc(`${myPackageJson.homepage}/pics/0.png`)  
            break; 
    
          case 1:
            setImgSrc(`${myPackageJson.homepage}/pics/1.png`) 
            break; 
    
          case 2:
            setImgSrc(`${myPackageJson.homepage}/pics/2.png`) 
            break; 
    
          case 3:
            setImgSrc(`${myPackageJson.homepage}/pics/3.png`) 
            break; 
    
          case 4:
            setImgSrc(`${myPackageJson.homepage}/pics/4.png`) 
            break; 
    
          case 5:
            setImgSrc(`${myPackageJson.homepage}/pics/5.png`) 
            break; 
    
          default:
            setShow(true);
            setImgSrc(`${myPackageJson.homepage}/pics/6.png`) 
        }
      }
    
  }, [clickedLetters, chosenWord, trimmedChosenWord])
  

  
  return (
    <div className="App">

      <GameOverModal 
        show={show} 
        isWining={isWining}
        onClose={ () => {
          setShow(false)
          newGameClicking()
          } } 
        title="GAME OVER" 
      />

      <div className='upperPart'>

        <div className='graphBoard'>

          <img className='img' src={imgSrc} alt="hangman"></img>

        </div>

        <div id="subjectBoard" className='subjectBoard'>

            <p>subject: {chosenSubject} </p>
        </div>

       </div>

            
      <div className='guessLines'>
        {
          chosenWord.split("").map( (l, i) => (

            <p key={`${l}-${i}`}>
                { l === " " ? "\u00a0" : (clickedLetters.includes(l) ? `${l}` : "_") } 
            </p>

          ) ) 
        }
      </div>

      <NewGameButton onClick={newGameClicking} />
      
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
            className={`lettersButtons ${coloringLettersBoard(letter)}`}
          >
          {letter} 
          </button> 
        ) )}
        
      </div>

    </div>
  );
}

export default App;