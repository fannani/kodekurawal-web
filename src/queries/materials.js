import gql from 'graphql-tag';

export const GET_MATERIAL = gql`
  query getMaterial($stageid : ID, $css: Boolean){
    material(where: {stage: $stageid}, css: $css){
      _id,materialType, body, url
    }
  }
`

export const UPDATE_MATERIAL = gql`
  mutation updateMaterial($id : ID!, $data: MaterialInput!){
    updateMaterial(where:{_id: $id }, input: $data) {
      _id
      body
      materialType
    }
  }
`;
