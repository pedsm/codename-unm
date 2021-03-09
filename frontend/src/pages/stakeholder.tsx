import {
  Skeleton,
  Editable,
  SimpleGrid,
  IconButton,
  Stat,
  Flex,
  StatLabel,
  StatNumber,
  StatHelpText,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import {
  DeleteIcon
} from '@chakra-ui/icons'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { DELETE_STAKEHOLDER, GET_STAKEHOLDER, GET_STAKEHOLDERS, EDIT_STAKEHOLDER } from '../gql'
import { useHistory, useRouteMatch } from 'react-router-dom';
import UserNeed from '../components/UserNeed'


export default function Stakeholder() {
  const { id }: any = useRouteMatch().params
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_STAKEHOLDER, {
    variables: { id }
  })
  const [deleteStakeholder] = useMutation(DELETE_STAKEHOLDER, {
    refetchQueries: [{ query: GET_STAKEHOLDERS }]
  })

  const stakeholder = data?.stakeholder
  const needCount = stakeholder?.userNeeds.length || 0
  const completedNeeds = stakeholder?.userNeeds.filter((need: any) => need.status == 'MET').length
  const completionRate = needCount === 0 
    ? '-'
    :(completedNeeds/needCount * 100).toFixed(2)

  const client = useApolloClient()
  async function edit(name:String, description:String) {
    return await client.mutate({
      mutation: EDIT_STAKEHOLDER,
      variables: {
        id: stakeholder.id,
        name,
        description,
      },
      refetchQueries: [
        { query: GET_STAKEHOLDERS },
        { query: GET_STAKEHOLDER, variables: { id } },
      ]
    })
  }

  return (
    <div>
      {loading
        ? <Skeleton height="40px" />
        : (
          <Editable defaultValue={stakeholder?.name} onChange={(name) => edit(name, stakeholder.description)}>
            <EditablePreview fontSize="2xl" fontWeight="bold" />
            <EditableInput />
          </Editable>
       )
      }
      {loading
        ? (<Skeleton height="20px" />)
        : (
          <Editable defaultValue={stakeholder?.name}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        )}
      <IconButton 
        aria-label="Delete User Need"
        icon={<DeleteIcon />}
        onClick={() => {
          deleteStakeholder({
            variables: { id: stakeholder.id }
          })
          history.push('/stakeholders')
        }}
      />
      {loading
        ? (
          <Skeleton height="2em" />
        )
        : (
          <Flex>
            <Stat>
              <StatLabel>User Needs</StatLabel>
              <StatNumber>{needCount}</StatNumber>
              <StatHelpText>In all statuses</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Need completion</StatLabel>
              <StatNumber>{completionRate}%</StatNumber>
              <StatHelpText>Of needs are Met</StatHelpText>
            </Stat>
          </Flex>
        )
      }
      {loading
        ? (<Skeleton height="1em" />)
        : (<SimpleGrid spacing={10} columns={3}>{stakeholder.userNeeds.map((userNeed: any, i: number) => (
          <UserNeed need={userNeed} key={i} />
        ))}</SimpleGrid>)}

    </div>
  )
}