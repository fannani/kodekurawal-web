import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const Choice = ({value, text, state, disable, onClick, }) => {
  const color = (state === "SELECTED") ? 'blue' : (state === "IS_ANSWER") ? 'green' : (state === "WRONG_ANSWER") ? 'red' : '#E5E5E5';
  const pointer_event = (disable) ? 'none' : 'auto';

  return (
    <div className="card" 
        style={{
          borderRadius:"10px",
          marginTop:"10px", 
          cursor:"pointer", 
          border: `2px solid ${color}`, 
          pointerEvents: pointer_event,
          padding:"10px"}}
         onClick={() => {
            onClick(value); // memanggil fungsi onClick dengan parameter value (jawaban :a,b,c,d)
         }}
    >
        <h6>{text}</h6>
    </div>
  )
}

const Quiz = ({ className }) => {
  const data = [
    {
      _id:'1', 
      question:'Soal 1 ini jawabannya?', 
      choices: [
        {value:'a', text:'Jawaban A'},
        {value:'b', text:'Jawaban B'},
        {value:'c', text:'Jawaban C'},
        {value:'d', text:'Jawaban D'},
      ],
      answer: 'b'
    },
    {
      _id:'2', 
      question:'Soal 2 ini jawabannya?', 
      choices: [
        {value:'a', text:'Jawaban A'},
        {value:'b', text:'Jawaban B'},
        {value:'c', text:'Jawaban C'},
        {value:'d', text:'Jawaban D'},
      ],
      answer: 'd'
    },
    {
      _id:'3', 
      question:'Soal 3 ini jawabannya?', 
      choices: [
        {value:'a', text:'Jawaban A'},
        {value:'b', text:'Jawaban B'},
        {value:'c', text:'Jawaban C'},
        {value:'d', text:'Jawaban D'},
      ],
      answer: 'a'
    },
    {
      _id:'4', 
      question:'Soal 4 ini jawabannya?', 
      choices: [
        {value:'a', text:'Jawaban A'},
        {value:'b', text:'Jawaban B'},
        {value:'c', text:'Jawaban C'},
        {value:'d', text:'Jawaban D'},
      ],
      answer: 'c'
    }
  ];
  
  const [choiceActive,setChoiceActive] = useState('');
  const [questionCorrect,setQuestionCorrect] = useState('');
  const [showMessage,setShowMessage] = useState('none');
  const [showBtnNext,setShowBtnNext] = useState(false);
  const [choiceDisable, setChoiceDisable] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  
  const onChoiceClick = (value) => {
    //value : jawaban=> a,b,c,d
    setChoiceActive(value);
  }

  const addScore = 100/data.length;

  const checkAnswer = () => {
    if (choiceActive === data[indexQuestion].answer) {
      setQuestionCorrect('y');
      setScore(score + addScore);
    } else {
      setQuestionCorrect('n');
    }
    setShowMessage('block');
    setShowBtnNext('inline');
    setChoiceDisable(1);
  }

  const resetValue = () => {
    setChoiceActive('');
    setQuestionCorrect('');
    setShowMessage('none');
    setShowBtnNext('none');
    setChoiceDisable(0);
  }

  const nextOrFinish = () => {
    if ((indexQuestion+1) < data.length) {
      // Next
      resetValue();
      setIndexQuestion(indexQuestion+1);
      setProgress(progress+addScore)
    } else {
      //Finish
      resetValue();
      alert(`Score Anda: ${score}`);
    }
  }

  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      
      <ProgressBar progress={progress}/>
       
        <div >
          <div 
            className={`alert ${questionCorrect === 'y'?'alert-success':'alert-danger'}`} 
            role="alert" 
            style={{display:showMessage}}>
            {`${questionCorrect === 'y'?'Mantap, jawaban kamu benar :)':'Ups, jawaban kamu salah :('}`}
          </div>
          <div className="col-8 offset-2" style={{marginTop: "10px"}}>
            <h3 style={{height: "100px"}}>{data[indexQuestion].question}</h3>
            { data[indexQuestion].choices.map(choice => (
              <Choice
                value={choice.value} 
                text={choice.text} 
                state={(() => {
                  if(choice.value === data[indexQuestion].answer  ){
                     return "IS_ANSWER" 
                  }
                  if(choiceActive === choice.value && choice.value !== data[indexQuestion].answer  ){
                    return "WRONG_ANSWER"
                  }
                  if(choiceActive === choice.value){ 
                    return "SELECTED" 
                  } 
                  
                })()} 
                disable={choiceDisable ? true : false}
                onClick={onChoiceClick}/>
            ))}
              <button 
                  className="btn btn-primary float-right" 
                  style={{marginTop:"20px", textAlign:"center"}} onClick={checkAnswer}>
                    Periksa
              </button>
              <button 
                  className="btn btn-success float-right"
                  style={{marginTop:"20px", textAlign:"center", display: showBtnNext}} onClick={nextOrFinish}>
                    {((indexQuestion+1) < data.length) ? 'Lanjut' : 'Selesai'}
              </button>
          </div>
        </div>
      
    </Card>
  )
}

export default styled(Quiz)`
margin-top:20px
margin-bottom:20px
height:calc(100vh - 140px)
  
`

