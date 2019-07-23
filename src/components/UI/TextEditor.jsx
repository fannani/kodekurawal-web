import React, { useState, useCallback, useEffect } from 'react';
import Draft, {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RichUtils,
} from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import firebase from 'firebase/app';
import 'firebase/storage';
import shortid from 'shortid';
import { useDropzone } from 'react-dropzone';
import 'draft-js-focus-plugin/lib/plugin.css';
import Modal from 'react-bootstrap4-modal';
import CodeUtils from 'draft-js-code';
import 'prismjs/themes/prism.css';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs';
import createHighlightPlugin from '../plugins/highlightPlugin';

import '../../assets/styles/editor.scss';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const highlightPlugin = createHighlightPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  resizeablePlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  blockDndPlugin,
  highlightPlugin,
];

const storageRef = firebase.storage().ref();
let childRef;

const TextEditor = ({
  value,
  onChangeData,
  readOnly = false,
  language,
  mode = 'draft',
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = state => {
    const contentState = state.getCurrentContent();
    const raw = convertToRaw(contentState);
    const editorJson = JSON.stringify(raw);
    onChangeData(editorJson);
    setEditorState(state);
  };

  useEffect(() => {
    const prismDecorator = new PrismDecorator({
      // Provide your own instance of PrismJS
      prism: Prism,
      defaultSyntax: language,
    });

    if (value !== null) {
      let content = null;
      if (mode === 'text') {
        content = Draft.ContentState.createFromText(value);
      } else {
        content = convertFromRaw(JSON.parse(value));
      }

      setEditorState(EditorState.createWithContent(content, prismDecorator));
    }
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    childRef = storageRef.child(shortid.generate());
    childRef.put(acceptedFiles[0]).then(() => {
      setLoadingImage(true);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(
    () => {
      if (loadingImage) {
        childRef
          .getDownloadURL()
          .then(url => {
            setShowModal(false);
            onChange(imagePlugin.addImage(editorState, url));
          })
          .catch(() => {});
        setLoadingImage(false);
      }
    },
    [loadingImage],
  );

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onImageClick = () => {
    setShowModal(true);
  };

  const onScriptClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'code-block'));
  };

  const onTitleClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'header-four'));
  };

  const onHighlight = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  };

  const handleKeyCommand = command => {
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFn = evt => {
    if (!CodeUtils.hasSelectionInBlock(editorState))
      return Draft.getDefaultKeyBinding(evt);

    const command = CodeUtils.getKeyBinding(evt);

    return command || Draft.getDefaultKeyBinding(evt);
  };

  const handleReturn = evt => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    onChange(CodeUtils.handleReturn(evt, editorState));
    return 'handled';
  };

  const onTab = evt => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    onChange(CodeUtils.onTab(evt, editorState));
    return 'handled';
  };

  if (readOnly) {
    return (
      <Editor
        readOnly={true}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        plugins={plugins}
      />
    );
  } else {
    return (
      <>
        <div className="editorContainer">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group mr-2"
              role="group"
              aria-label="First group"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onBoldClick}
              >
                <b>B</b>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onItalicClick}
              >
                <i>I</i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onUnderlineClick}
              >
                <u>U</u>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHighlight}
              >
                <span style={{ background: '#DFE0E0', color: 'black' }}>H</span>
              </button>
            </div>
            <div
              className="btn-group mr-2"
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onTitleClick}
              >
                <b>Title</b>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onImageClick}
              >
                Image
              </button>
              <button
                type="button"
                className="btn  btn-secondary"
                onClick={onScriptClick}
              >
                Script
              </button>
            </div>
          </div>
          <div className="editors">
            <Editor
              editorState={editorState}
              keyBindingFn={keyBindingFn}
              handleKeyCommand={handleKeyCommand}
              handleReturn={handleReturn}
              onTab={onTab}
              onChange={onChange}
              plugins={plugins}
            />
          </div>
        </div>

        <Modal
          visible={showModal}
          onClickBackdrop={() => {
            setShowModal(false);
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Add Image</h5>
          </div>
          <div className="modal-body">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop</p> : <p>Drag</p>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              OK
            </button>
          </div>
        </Modal>
      </>
    );
  }
};

export default TextEditor;
