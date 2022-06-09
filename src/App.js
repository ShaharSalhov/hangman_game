import './App.css';
import React from 'react';

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

  

  React.useEffect( () => {
    gettingRandomWordAndSubject()
  }, [])
  
  

  return (
    <div className="App">

      <div className='upperPart'>

        <div className='graphBoard'>

          <div className='pic'>pic</div>

          <p>Only X more moves to play...</p>

        </div>


        <div className='guessBoard'>

          <p>subject: {chosenSubject} </p>

          <div className='guessLines'>
            {
              chosenWord.split("").map( (l) => (
                <p>
                    {clickedLetters.includes(l) ? l : "_"} 
                </p>
              ))
            }
          </div>

        </div>

      </div>
      

      <div className='lettersBoard'>

        {allLetters.map( (letter) => (
          
          <button
           id={letter} 
           onClick= { () => setClickedLetters([...clickedLetters, letter])}
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