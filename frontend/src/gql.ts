import { gql } from '@apollo/client'

export const GET_USER_NEEDS = gql`
  query {
    userNeeds {
      id
      name
      description
    }
  }
`

export const GET_USER_NEED = gql`
  query($id:ID!) {
    userNeed(id:$id) {
      id
      name
      description
    }
  }
`

export const ADD_USER_NEED = gql`
  mutation($name:String!, $description:String!) {
    addUserNeed(name: $name, description: $description) {
      id
      name
      description
    }
  }
`
export const DELETE_USER_NEED = gql`
  mutation($id:ID!) {
    deleteUserNeed(id: $id)
  }
`