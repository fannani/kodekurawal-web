import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const Choice = ({value, text, onClickChoice, setChoiceActive}) => {
  return (
    <div className="card" 
        style={{borderRadius:"10px",marginTop:"10px", border: `2px solid #E5E5E5`, padding:"10px"}}
        onClick={() => setChoiceActive(value)}>
        <h6>{text}</h6>
    </div>
  )
}

const Quiz = ({ className }) => {
  const [choiceActive,setChoiceActive] = useState('a');

  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      <ProgressBar/>
      <div className="col-8 offset-2" style={{marginTop: "10px"}}>
        <h3 style={{height: "100px"}}>Jawablah pertanyaan ini ? {choiceActive}</h3>
        <div>
        <Choice value="a" text="Jawaban A" onClickChoice={choiceActive === 'a' ? true : false} setChoiceActive/>
        <Choice value="b" text="Jawaban B" onClickChoice={choiceActive === 'b' ? true : false} setChoiceActive/>
        <Choice value="c" text="Jawaban C" onClickChoice={choiceActive === 'c' ? true : false} setChoiceActive/>
        <Choice value="d" text="Jawaban D" onClickChoice={choiceActive === 'd' ? true : false} setChoiceActive/>
          <button 
              className="btn btn-primary float-right" 
              style={{marginTop:"20px", textAlign:"center"}} >
                Periksa 
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

