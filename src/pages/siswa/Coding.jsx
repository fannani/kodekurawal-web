import React from 'react'
import SiswaCourseGuide from "../../components/siswa/Course/Guide";
import SiswaCourseEditor from "../../components/siswa/Course/Editor";
import {checkResult} from "../../utils/course";
import SiswaCourseOutput from "../../components/siswa/Course/Output";


const Coding = ({interactive, stage, onScriptChange,result,editorId,reset }) => (
  <>
      <SiswaCourseGuide
        visible={false}
        result={result}
        stage={stage}
        show={interactive.guideShow}
        onClick={interactive.onGuideClick}
      />
      <SiswaCourseEditor
      checkResult={data =>
      checkResult(data, stage.missions)
      }
      onClick={interactive.onEditorClick}
      show={interactive.editorShow}
      editorId={editorId}
      initialScript={stage.script}
      onExpandClick={interactive.onEditorExpandClick}
      size={interactive.editorSize}
      onReset={reset}
      onChange={data => {
        onScriptChange(data)
      }}
      />
     <SiswaCourseOutput
      activeMode={
        stage.course._id ===
        '5cbee57ee721c733c0a428a7'
          ? 'console'
          : 'output'
      }
      show={interactive.outputShow}
      onExpandClick={interactive.onOutputExpandClick}
      onClick={interactive.onOutputClick}
      size={interactive.outputSize}
    />
</>
)

export default Coding;