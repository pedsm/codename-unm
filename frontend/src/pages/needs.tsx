import {
  Text,
  Box,
  Badge,
  Heading,
  SimpleGrid,
  Spacer,
  Flex,
  Button
} from '@chakra-ui/react'
import { Spinner } from "@chakra-ui/react"
import { useQuery } from '@apollo/client'
import AddUserNeedsModal from '../modals/addUserNeedModal'
import { GET_USER_NEEDS } from '../gql'
import UserNeed from '../components/UserNeed'


export default function Needs() {
  const { loading, error, data } = useQuery(GET_USER_NEEDS)

  const userNeeds = data?.userNeeds || []
  console.log(userNeeds)

  return (
    <div>
      <Heading m="20px 0">User needs</Heading>
      <AddUserNeedsModal />
      {loading && (<Spinner />)}
      <SimpleGrid columns={3} spacing={10}>
        {userNeeds.map((need: any, i: number) => (
          <UserNeed key={i} need={need} />
        ))}
      </SimpleGrid>
    </div>
  )
}