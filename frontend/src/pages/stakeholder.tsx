import {
  Text,
  Skeleton,
  Heading,
  SimpleGrid
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_STAKEHOLDER } from '../gql'
import { useRouteMatch } from 'react-router-dom';
import UserNeed from '../components/UserNeed'


export default function Stakeholder() {
  const { id }:any = useRouteMatch().params
  const { loading, error, data } = useQuery(GET_STAKEHOLDER, {
    variables: { id }
  })

  const stakeholder = data?.stakeholder
  console.log(error)
  console.log(stakeholder)

  return (
    <div>
      {loading 
        ? <Skeleton height={40} />
        : <Heading m="20px 0">{stakeholder?.name}</Heading>
      }
      {loading 
      ? (<Skeleton height="1em"/>)
      : (<Text paddingBottom="1em">{stakeholder?.description}</Text>)}
      {loading 
      ? (<Skeleton height="1em"/>)
        : (<SimpleGrid spacing={10} columns={3}>{stakeholder.userNeeds.map((userNeed: any, i: number) => (
          <UserNeed need={userNeed} key={i} />
      ))}</SimpleGrid>)}
      
    </div>
  )
}