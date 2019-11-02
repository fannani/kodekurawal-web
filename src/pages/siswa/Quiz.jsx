import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const Message = styled.p`
  font-weight:bold;
  font-size:24px;
  color : ${props => ( props.submitted ? props.result ? '#58a700':'#ea2b2b' : '' ) };
  position:absolute;
  margin-left:50px;
  bottom:16px;
  
`

const ButtonSubmit = styled.button`
  margin-right:50px;
  width:120px;
  font-weight:500;
  margin-bottom:20px;
  padding:10px;
  background-color : ${props => ( props.submitted ? props.result ? '#58a700':'#ea2b2b' : '' ) };
  border-color: ${props => ( props.submitted ? props.result ? '#58a700':'#ea2b2b' : '' )};
  :hover {
    background-color : ${props => ( props.submitted ? props.result ? '#58a700':'#ea2b2b' : '' ) };
      border-color: ${props => ( props.submitted ? props.result ? '#58a700':'#ea2b2b' : '' )};
  }
  :focus {
    box-shadow: 0 0 0 0.2rem ${props => ( props.submitted ? props.result ? 'rgba(88,167,0,0.5)':'rgb(234,43,43,0.5)' : '' )};
  }
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
  background-color: ${props => ( props.submitted ? props.result ? '#B8F28B':'#FFC1C1' : '' ) };
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

const Quiz = ({ className, stage : {quiz} }) => {
  const [choiceActive,setChoiceActive] = useState('');
  const [result,setResult] = useState('');
  const [choiceDisable, setChoiceDisable] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const onChoiceClick = (value) => {
    setChoiceActive(value);
  }

  const addScore = 100/quiz.questions.length;

  const gameOver = () => {
    alert(`Score Anda: ${score}`);
  }

  const submit = () => {
    if(isSubmitted){
      setIsSubmitted(false);
      resetValue();
      if ((indexQuestion+1) < quiz.questions.length) {
        setIndexQuestion(indexQuestion+1);
      } else {
        gameOver();
      }
    } else {
      setProgress(progress+addScore)
      if (choiceActive === quiz.questions[indexQuestion].answer) {
        setResult(true);
        setScore(score + addScore);
      } else {
        setResult(false);
      }
      setChoiceDisable(1);
      setIsSubmitted(true);
    }
  }

  const resetValue = () => {
    setChoiceActive('');
    setChoiceDisable(0);
  }



  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      <ProgressBar progress={progress}/>
        <div >
          <div className="col-8 offset-2" style={{marginTop: "10px"}}>
            <QuestionText>{quiz.questions[indexQuestion].content}</QuestionText>
            { quiz.questions[indexQuestion].choice.map(choice => (
              <Choice
                value={choice}
                text={choice}
                state={(() => {
                  if(choice === quiz.questions[indexQuestion].answer && isSubmitted ){
                     return "IS_ANSWER" 
                  }
                  if(choiceActive === choice && choice !== quiz.questions[indexQuestion].answer && isSubmitted  ){
                    return "WRONG_ANSWER"
                  }
                  if(choiceActive === choice){
                    return "SELECTED" 
                  }
                })()} 
                disable={choiceDisable ? true : false}
                onClick={onChoiceClick}/>
            ))}

          </div>
          <BottomBar submitted={isSubmitted} result={result}>
            <Message submitted={isSubmitted} result={result} >
              {isSubmitted ? result ? 'Selamat jawaban anda benar' : 'Jawaban anda salah' : '' }
            </Message>
            <ButtonSubmit
              submitted={isSubmitted} result={result}
              className="btn btn-primary float-right"
              style={{marginTop:"20px", textAlign:"center"}} onClick={submit}>
              {isSubmitted ? indexQuestion < quiz.questions.length - 1 ? 'Lanjut' : 'Selesai' : 'Periksa'}
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

