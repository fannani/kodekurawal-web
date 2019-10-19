import axios from 'axios';

class UploadAdapter {
  constructor(loader, client, MUTATION) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;
    this.MUTATION = MUTATION;
    this.client = client;

    // URL where to send files.
    this.url = 'https://example.com/image/upload/path';
  }

  // Starts the upload process.
  upload() {
    return this.sendRequest();

    //   const data = await axios.post(API_URL, {
    //     query: `mutation updateUserCity($id: Int!, $city: String!) {
    //   updateUserCity(userID: $id, city: $city){
    //     id
    //     name
    //     age
    //     city
    //     knowledge{
    //       language
    //       frameworks
    //     }
    //   }
    // }`,
    //     variables: {
    //       id: 2,
    //       city: 'Test'
    //     }
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    // axios.post(this.url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })

    // return new Promise( ( resolve, reject ) => {
    //   this._initRequest();
    //   this._initListeners( resolve, reject );
    //   this._sendRequest();
    // } );
  }

  async sendRequest() {
    const file = await this.loader.file;
    const result = await this.client.mutate({
      mutation: this.MUTATION,
      variables: {
        file,
        title: 'ckeditor image',
      },
    });

    return {
      default: `${process.env.REACT_APP_STATIC_URL}${result.data.uploadFile.path}`,
    };
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const { xhr } = this;
    const { loader } = this;
    const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;

      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();
    data.append('upload', this.loader.file);

    this.xhr.send(data);
  }
}

export default UploadAdapter;
