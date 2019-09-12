import React from 'react'
import styled from 'styled-components'

const Tracker = styled.div`
  width: 100%;
  height: 20px;
  padding:2px;
  margin: 15px auto;
  background-color: #E5E5E5;
  border-radius: 10px;
  
`

const ProgressInTracker = () => (
  <div style={{width: '80%', backgroundColor: "#93D333",height:'100%', borderRadius: "10px"}}>
  </div>
)

const ProgressBar = () => {
    return (
      <Tracker>
        <ProgressInTracker percentage={25} />
      </Tracker>
    )
}

export default ProgressBar;