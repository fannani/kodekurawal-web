import React, {useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Card from "../../components/UI/Card";
import ProgressBar from "../../components/UI/ProgressBar";

const Choice = () => (
  <div className="card" style={{borderRadius:"10px",marginTop:"10px", border: "2px solid #E5E5E5", padding:"10px"}}>
      <h6>Jawaban A</h6>
  </div>
)

const Quiz = ({ className }) => {
  return (
    <Card className={classnames(className,"card col-10 offset-1")}>
      <ProgressBar/>
      <div className="col-8 offset-2" style={{marginTop: "10px"}}>
        <h3 style={{height: "100px"}}>Jawablah apa yang ingin anda jawab, dan jangan dijawab jika tidak ingin dijawab ?</h3>
        <div>
        <Choice/>
        <Choice/>
        <Choice/>
        <Choice/>
          <button className="btn btn-primary float-right" style={{marginTop:"20px", textAlign:"center"}} >Periksa </button>
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

