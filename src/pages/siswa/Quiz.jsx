import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const Choice = ({value, text,  selected, onClick}) => {
  const color = (selected) ? 'green' : '#E5E5E5'; //jika selected === true maka warna border menjadi green

  return (
    <div className="card" 
        style={{borderRadius:"10px",marginTop:"10px", border: `2px solid ${color}`, padding:"10px"}}
         onClick={() => {
            onClick(value); // memanggil fungsi onClick dengan parameter value (jawaban :a,b,c,d)
         }}
    >
        <h6>{text}</h6>
    </div>
  )
}

const Quiz = ({ className }) => {
  const [choiceActive,setChoiceActive] = useState('a');

  const onChoiceClick = (value) => {
    //value : jawaban=> a,b,c,d
    setChoiceActive(value);
  }

  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      <ProgressBar/>
      <div className="col-8 offset-2" style={{marginTop: "10px"}}>
        <h3 style={{height: "100px"}}>Jawablah pertanyaan ini ? {choiceActive}</h3>
        <div>
        <Choice value="a" text="Jawaban A" selected={choiceActive === 'a' ? true : false} onClick={onChoiceClick}/>
        <Choice value="b" text="Jawaban B" selected={choiceActive === 'b' ? true : false} onClick={onChoiceClick} />
        <Choice value="c" text="Jawaban C" selected={choiceActive === 'c' ? true : false} onClick={onChoiceClick} />
        <Choice value="d" text="Jawaban D" selected={choiceActive === 'd' ? true : false} onClick={onChoiceClick} />
          <button 
              className="btn btn-primary float-right" 
              style={{marginTop:"20px", textAlign:"center"}} onClick={() => {
                //pemeriksaan jawaban choiceActive === jawaban benar
          }}>
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

