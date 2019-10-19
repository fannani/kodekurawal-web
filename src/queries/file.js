import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
    mutation uploadFilfe($title : String!, $file : Upload!){
        uploadFile(input: {
            title: $title,
            file: $file,
        }) {
            path, title
        }
    }
`;
