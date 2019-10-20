import React, {useRef, useState} from 'react';
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks";
import {GET_MATERIAL, UPDATE_MATERIAL} from "../../../../queries/materials";
import {UPLOAD_FILE} from "../../../../queries/file";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";
import UploadAdapter from "../../../../utils/UploadAdapter";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {GET_STAGE_BY_ID, UPDATE_STAGE} from "../../../../queries/stages";

const materialType = {
  PDF: 'PDF',
  WEB: 'WEB',
};

const ContentCreator = ({body, onInit, onChange, type, onChangeFile, isUploading}) => {
  if (type === materialType.WEB) {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={body}
        onInit={onInit}
        onChange={onChange}
      />
    );
  }
  return (
    <div className="form-group">
      <label htmlFor="file">PDF File</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={(event) => {
          onChangeFile(event);
        }}
        className="form-control-file"
      />
      <span style={{ visibility: (isUploading ? 'visible' : 'hidden') }} className="badge badge-warning">Uploading</span>
    </div>
  );
};

const MaterialType = ({stage}) => {
  const client = useApolloClient();
  const formMaterial = useRef(null);
  const [pdfPath, setPdfPath] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { data, loading, error } = useQuery(GET_MATERIAL, {
    variables: {
      stageid: stage._id,
      css: false,
    },

  });
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted({ uploadFile }) {
      formMaterial.current.setSubmitting(false);
      setPdfPath(uploadFile.path);
      setIsUploading(false);
    },
  });

  const [updateStage] = useMutation(UPDATE_STAGE, {
    onCompleted() {
      toast.success("Updated successfully");
      formMaterial.current.setSubmitting(false);
    }
  })

  const [updateMaterial] = useMutation(UPDATE_MATERIAL, {
    update(cache, { data: { updateMaterial: result } }) {
      cache.writeQuery({
        query: GET_MATERIAL,
        variables: {
          stageid: stage._id,
          css: false,
        },
        data: { material: result },
      });
    },
    onCompleted() {
      toast.success("Updated successfully");
      formMaterial.current.setSubmitting(false);
    },
  });

  if (loading) return <p>Loading…</p>;
  if (error) {
    return (
      <p>Sorry! There was an error loading the items</p>
    );
  }
  return (
    <Formik
      ref={formMaterial}
      initialValues={{
        title: stage.title,
        body: data.material ? data.material.body : '',
        materialType: data.material ? data.material.materialType : materialType.WEB,
      }}
      onSubmit={({ title, body, materialType }, { setSubmitting }) => {
        setSubmitting(true);
        // TODO: update after insert
        updateStage({ variables: { title, id: stage._id } });
        updateMaterial({
          variables: {
            id:  data.material._id,
            data: {
              materialType,
              body,
              url: pdfPath,
              stage: stage._id,
            },
          },
        });
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"

            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <Field name="materialType" component="select" placeholder="Type" className="form-control">
              <option value="PDF">PDF</option>
              <option value="WEB">Custom</option>
            </Field>
          </div>
          <div className="row">
            <div className="col-8">
              <ContentCreator
                type={values.materialType}
                body={values.body}
                isUploading={isUploading}
                onChangeFile={(event) => {
                  formMaterial.current.setSubmitting(true);
                  uploadFile({
                    variables: {
                      file: event.currentTarget.files[0],
                      title: 'material pdf',
                    },
                  });
                  setIsUploading(true);
                }}
                onInit={(editor) => {
                  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                    return new UploadAdapter(loader, client, UPLOAD_FILE);
                  };
                }}
                onChange={(event, editor) => {
                  setFieldValue('body', editor.getData());
                }}
              />

            </div>
          </div>
          <button type="submit" style={{ marginTop: '10px' }} disabled={isSubmitting} className="btn btn-primary">
            Save
          </button>

        </Form>
      )}
    </Formik>
  )
}

export default MaterialType