import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import classNames from 'classnames';
import { BASE_URL } from '../../../config/config';
import 'brace/mode/html';
import 'brace/mode/c_cpp';

import 'brace/theme/tomorrow';
import { Button } from '../../UI/Components';
import APIService from "../../../services/APIService";

const postScript = `\x3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'>\x3C/script>
\x3Cscript src='${BASE_URL}assets/js/validator.js'>\x3C/script>`;

const SiswaCourseEditor = ({
  checkResult,
  initialScript,
  className,
  size = 4,
  onExpandClick,
  onChange,
  onClick,
  show,
  editorId,
  language,
}) => {
  const [script, setScript] = useState(initialScript);
  const onChangeScript = value => {
    setScript(value);
    onChange(value);
    // const idoc = document.getElementById('output').contentWindow.document;
    // setScript(value);
    // onChange(value);
    // idoc.open();
    // idoc.write(value);
    // idoc.close();
  };

  const run = () => {
    let runScript = '';
    if(language === 'c++'){
      runScript = '\x3Cscript>console.log("Compiling...")\x3C/script>';
      APIService.mutation(
        `compile(script : "${script.replace(/(?:\r\n|\r|\n)/g, '\\n').replace(/"/g, '\\"')}")`,
      ).then(response => {
        const idoc = document.getElementById('output').contentWindow.document;
        const data = response.data.data.compile.split('\\n');
        runScript = '';
        for(const val of data)
          runScript += '\x3Cscript>console.log("'+val+'")\x3C/script>';
        idoc.open();
        idoc.write(postScript + runScript);
        idoc.close();
      });
    } else {
      runScript = script;
    }
    if (document.getElementById('output')) {
      const idoc = document.getElementById('output').contentWindow.document;
      idoc.open();
      idoc.write(postScript + runScript);
      idoc.close();
    }

  };
  useEffect(
    () => {
      setScript(initialScript);
      onChangeScript(initialScript);
    },
    [editorId],
  );

  return (
    <div
      onClick={onClick}
      className={classNames(className, show ? `col-sm-${size}` : 'col-sm-1')}
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {(function() {
        if (show)
          return (
            <>
              <div style={{ height: '50px' }}>
                <Button type="button" id="run" onClick={run} className="btn ">
                  Jalankan
                </Button>
                <Button
                  type="button"
                  id="check"
                  onClick={() => {
                    //run();
                    checkResult(script);
                  }}
                  className="btn "
                >
                  Periksa
                </Button>

                <Button
                  onClick={onExpandClick}
                  type="button"
                  className="btn btn-right"
                >
                  Expand
                </Button>
              </div>
              <AceEditor
                mode={language === 'c++' ? 'c_cpp' : 'html' }
                theme="tomorrow"
                value={script}
                width="100%"
                style={{ height: 'calc(100% - 50px)' }}
                setOptions={{
                  fontSize: '12pt',
                  vScrollBarAlwaysVisible: true,
                }}
                onChange={onChangeScript}
                wrapEnabled={true}
              />
            </>
          );
        return '';
      })()}
    </div>
  );
};

const StyledEditor = styled(SiswaCourseEditor)`
  padding-left: 0 !important;
  padding-right: 0 !important;
  background-color: #ebebeb;
  .btn-right {
    float: right;
  }
`;

export default StyledEditor;
