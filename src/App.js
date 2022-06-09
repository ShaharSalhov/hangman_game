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

  const [chosenWordAndSubject, setChosenWordAndSubject] = React.useState({})
  const [chosenWord, setChosenWord] = React.useState("")
  const [chosenSubject, setChosenSubject] = React.useState("")


  const gettingRandomWordAndSubject = () => {

    let numberOfSubjects = vocabulary.length;
    let randomSubjectIndex = Math.floor(Math.random() * numberOfSubjects);
    let numberOfWordsInRandomSelectedSubject = vocabulary[randomSubjectIndex].words.length
    let randomWordIndex = Math.floor(Math.random() * numberOfWordsInRandomSelectedSubject);

    let chosenWord = vocabulary[randomSubjectIndex].words[randomWordIndex];
    let chosenSubject = vocabulary[randomSubjectIndex].subject

    setChosenWordAndSubject(
      {
        "randomChosenWord": chosenWord,
        "randomChosenSubject": chosenSubject,
      }
    )

    return chosenWordAndSubject;
  }

  const coloringLettersBoard = () => {


  }



  React.useEffect( () => {
    gettingRandomWordAndSubject()
    setChosenWord(chosenWordAndSubject.randomChosenWord)
    setChosenSubject(chosenWordAndSubject.randomChosenSubject)
  }, [])
  
  

  return (
    <div className="App">

      <div className='upperPart'>

        <div className='graphBoard'>

          <div className='pic'>pic</div>

          <p>Only X more moves to play...</p>

        </div>


        <div className='guessBoard'>

          <p>subject:</p>

          guess

        </div>

      </div>
      

      <div className='lettersBoard'>

        {allLetters.map ( (letter) => (
          
          <button
           id={letter} 
           onClick={ () => coloringLettersBoard(letter) 
          }> 
          
          {letter} 

          </button> 

        ) )}
        
      </div>

    </div>
  );
}

export default App;
