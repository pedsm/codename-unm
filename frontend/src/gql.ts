import { gql } from '@apollo/client'

export const GET_USER_NEEDS = gql`
  query {
    userNeeds {
      id
      name
      description
      stakeholder {
        name
      }
    }
  }
`

export const GET_USER_NEED = gql`
  query($id:ID!) {
    userNeed(id:$id) {
      id
      name
      description
      stakeholder {
        id
        name
        description
      }
    }
  }
`

export const ADD_USER_NEED = gql`
  mutation($name:String!, $description:String!, $stakeholderId:ID!) {
    addUserNeed(name: $name, description: $description, stakeholderId:$stakeholderId) {
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

export const GET_STAKEHOLDERS = gql`
  query {
    stakeholders {
      id
      name
      description
    }
  }
`

export const ADD_STAKEHOLDER = gql`
  mutation($name:String!, $description:String!) {
    addStakeholder(name: $name, description: $description) {
      id
      name
      description
    }
  }
`