import {
  Text,
  Skeleton,
  Heading,
  SimpleGrid,
  IconButton,
  Stat,
  Flex,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'
import {
  DeleteIcon
} from '@chakra-ui/icons'
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_STAKEHOLDER, GET_STAKEHOLDER, GET_STAKEHOLDERS } from '../gql'
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

  return (
    <div>
      {loading
        ? <Skeleton height={40} />
        : <Heading m="20px 0">{stakeholder?.name}</Heading>
      }
      {loading
        ? (<Skeleton height="1em" />)
        : (<Text paddingBottom="1em">{stakeholder?.description}</Text>)}
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