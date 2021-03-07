import {
  Text,
  Skeleton,
  Heading,
  SimpleGrid,
  Stat,
  Flex,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_STAKEHOLDER } from '../gql'
import { useRouteMatch } from 'react-router-dom';
import UserNeed from '../components/UserNeed'


export default function Stakeholder() {
  const { id }: any = useRouteMatch().params
  const { loading, error, data } = useQuery(GET_STAKEHOLDER, {
    variables: { id }
  })

  const stakeholder = data?.stakeholder
  const needCount = stakeholder?.userNeeds.length
  const completionRate = stakeholder == null 
    ? (stakeholder.userNeeds.filter((need:any) => need.status ==='MET').length / needCount) * 100
    : 0

  return (
    <div>
      {loading
        ? <Skeleton height={40} />
        : <Heading m="20px 0">{stakeholder?.name}</Heading>
      }
      {loading
        ? (<Skeleton height="1em" />)
        : (<Text paddingBottom="1em">{stakeholder?.description}</Text>)}
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
              <StatNumber>{completionRate.toFixed(2)}%</StatNumber>
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