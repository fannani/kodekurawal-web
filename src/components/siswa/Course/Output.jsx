import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 0px !important;
  background-color: #4891e3;
  margin: 5px;
  color: white;
`;
const SiswaCourseOutput = ({
  activeMode = 'output',
  show = true,
  onClick,
  size,
  onExpandClick,
}) => {
  const [mode, setMode] = useState(activeMode);

  return (
    <div
      id="output-tab"
      className={!show ? 'col-sm-1' : `col-sm-${size}`}
      style={{ paddingLeft: '0px', paddingRight: '0px' }}
      onClick={onClick}
    >
      <div style={{ height: '50px', visibility: show ? 'visible' : 'hidden' }}>
        <Button
          type="button"
          className="btn btn-right"
          onClick={() => {
            setMode('output');
          }}
          className={
            mode === 'output' ? 'btn btn-right btn-secondary' : 'btn btn-right '
          }
          style={{ float: 'left' }}
        >
          Output
        </Button>
        <Button
          type="button"
          onClick={() => {
            setMode('console');
          }}
          className={
            mode === 'console'
              ? 'btn btn-right btn-secondary'
              : 'btn btn-right '
          }
          style={{ float: 'left' }}
        >
          Console
        </Button>
        <Button
          type="button"
          onClick={onExpandClick}
          className="btn btn-right"
          style={{ float: 'right' }}
        >
          Expand
        </Button>
      </div>
      <iframe
        title="output"
        id="output"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: 'calc(100% - 50px)',
          display: show && mode === 'output' ? 'block' : 'none',
        }}
        frameBorder="0"
      />
      <iframe
        title="console"
        id="console"
        style={{
          backgroundColor: '#151718',
          width: '100%',
          height: 'calc(100% - 50px)',
          display: show && mode === 'console' ? 'block' : 'none',
        }}
        frameBorder="0"
      />
    </div>
  );
};

export default SiswaCourseOutput;
