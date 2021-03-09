import { gql } from '@apollo/client'

export const GET_USER_NEEDS = gql`
  query {
    userNeeds {
      id
      name
      description
      status
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
      status
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

export const UPDATE_NEED_STATUS = gql`
mutation($id:ID!, $newStatus:NeedStatus!) {
  updateNeedStatus(id: $id, newStatus: $newStatus) {
    id
    name
    status
  }
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

export const GET_STAKEHOLDER = gql`
  query($id:ID!) {
    stakeholder(id:$id) {
      id
      name
      description
      userNeeds {
        id
        name
        description
        status
      }
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

export const EDIT_STAKEHOLDER = gql`
  mutation($id:ID!, $name: String!, $description: String!) {
    editStakeholder(id: $id, name: $name, description: $description) {
      id
      name
      description
      userNeeds {
        id
        name
        description
        status
      }
    }
  }
`

export const DELETE_STAKEHOLDER = gql`
  mutation($id:ID!) {
    deleteStakeholder(id: $id)
  }
`