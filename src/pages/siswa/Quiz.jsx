import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const ButtonSubmit = styled.button`
  margin-right:50px;
  width:120px;
  font-weight:500;
  margin-bottom:20px;
  padding:10px;
`

const ChoiceText = styled.p`
  margin:0px;
  padding:0px;
  font-weight:500;
  margin-left:10px;
`
const QuestionText = styled.p`
  font-weight : 500;
  font-size:19px;
  margin-bottom:20px;
`

const BottomBar = styled.div`
  position:absolute;
  width: 100% ;
  bottom:0;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  padding:10px;
  left: 0;
  background-color: #B8F28B;
`

const Choice = ({value, text, state, disable, onClick, }) => {
  const color = (state === "SELECTED") ? '#1FB1F7' : (state === "IS_ANSWER") ? '#93D333' : (state === "WRONG_ANSWER") ? '#EF494F' : '#E5E5E5';
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
        <ChoiceText>{text}</ChoiceText>
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
  const [choiceDisable, setChoiceDisable] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const onChoiceClick = (value) => {
    setChoiceActive(value);
  }

  const addScore = 100/data.length;

  const gameOver = () => {
    alert(`Score Anda: ${score}`);
  }

  const submit = () => {
    if(isSubmitted){
      setIsSubmitted(false);
      resetValue();
      if ((indexQuestion+1) < data.length) {
        setIndexQuestion(indexQuestion+1);
        setProgress(progress+addScore)
      } else {
        gameOver();
      }
    } else {
      if (choiceActive === data[indexQuestion].answer) {
        setQuestionCorrect('y');
        setScore(score + addScore);
      } else {
        setQuestionCorrect('n');
      }
      setShowMessage('block');
      setChoiceDisable(1);
      setIsSubmitted(true);
    }
  }

  const resetValue = () => {
    setChoiceActive('');
    setQuestionCorrect('');
    setShowMessage('none');
    setChoiceDisable(0);
  }



  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      <ProgressBar progress={progress}/>
        <div >
          {/*<div */}
          {/*  className={`alert ${questionCorrect === 'y'?'alert-success':'alert-danger'}`} */}
          {/*  role="alert" */}
          {/*  style={{display:showMessage}}>*/}
          {/*  {`${questionCorrect === 'y'?'Mantap, jawaban kamu benar :)':'Ups, jawaban kamu salah :('}`}*/}
          {/*</div>*/}
          <div className="col-8 offset-2" style={{marginTop: "10px"}}>
            <QuestionText>{data[indexQuestion].question}</QuestionText>
            { data[indexQuestion].choices.map(choice => (
              <Choice
                value={choice.value} 
                text={choice.text} 
                state={(() => {
                  if(choice.value === data[indexQuestion].answer && isSubmitted ){
                     return "IS_ANSWER" 
                  }
                  if(choiceActive === choice.value && choice.value !== data[indexQuestion].answer && isSubmitted  ){
                    return "WRONG_ANSWER"
                  }
                  if(choiceActive === choice.value){ 
                    return "SELECTED" 
                  } 
                  
                })()} 
                disable={choiceDisable ? true : false}
                onClick={onChoiceClick}/>
            ))}

          </div>
          <BottomBar>
            <ButtonSubmit
              className="btn btn-primary float-right"
              style={{marginTop:"20px", textAlign:"center"}} onClick={submit}>
              {isSubmitted ? 'Lanjut' : 'Periksa'}
            </ButtonSubmit>

          </BottomBar>
        </div>
      
    </Card>
  )
}

export default styled(Quiz)`
margin-top:20px
margin-bottom:20px
height:calc(100vh - 140px)
  
`

