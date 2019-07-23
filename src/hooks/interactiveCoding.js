import { useState } from 'react';

const useInteractiveCoding = () => {
  const [guideShow, setGuideShow] = useState(true);
  const [outputShow, setOutputShow] = useState(true);
  const [editorSize, setEditorSize] = useState(4);
  const [outputSize, setOutputSize] = useState(4);
  const [editorShow, setEditorShow] = useState(true);
  const onEditorExpandClick = () => {
    if (editorSize < 10) {
      setGuideShow(false);
      setOutputShow(false);
      setEditorSize(10);
      setOutputSize(4);
    } else {
      setGuideShow(true);
      setOutputShow(true);
      setEditorSize(4);
    }
  };

  const onOutputExpandClick = () => {
    if (outputSize < 10) {
      setGuideShow(false);
      setEditorShow(false);
      setOutputSize(10);
      setEditorSize(4);
    } else {
      setGuideShow(true);
      setEditorShow(true);
      setOutputSize(4);
    }
  };

  const onOutputClick = () => {
    if (!outputShow) {
      setOutputShow(true);
      setOutputSize(4);
      setEditorSize(editorSize - 3);
    }
  };
  const onEditorClick = () => {
    if (!editorShow) {
      setEditorShow(true);
      setEditorSize(4);
      setOutputSize(outputSize - 3);
    }
  };
  const onGuideClick = () => {
    if (!guideShow) {
      setGuideShow(true);
      if (editorSize >= 7) {
        setEditorSize(editorSize - 3);
      }
      if (outputSize >= 7) {
        setOutputSize(outputSize - 3);
      }
    }
  };
  return {
    onGuideClick,
    onEditorClick,
    onOutputClick,
    onOutputExpandClick,
    onEditorExpandClick,
    guideShow,
    editorShow,
    outputShow,
    outputSize,
    editorSize,
  };
};

export default useInteractiveCoding;
