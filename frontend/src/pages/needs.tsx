import {
  Text,
  Box,
  Badge,
  Heading,
  SimpleGrid,
  Spacer,
  HStack,
  VStack,
  Flex,
  Button
} from '@chakra-ui/react'
import { Spinner } from "@chakra-ui/react"
import { useQuery } from '@apollo/client'
import AddUserNeedsModal from '../modals/addUserNeedModal'
import { GET_USER_NEEDS } from '../gql'
import UserNeed from '../modals/viewUserNeedModal'


export default function Needs() {
  const { loading, error, data } = useQuery(GET_USER_NEEDS)

  const userNeeds = data?.userNeeds || []

  return (
    <div>
      <Heading m="20px 0">User needs</Heading>
      <AddUserNeedsModal />
      {loading && (<Spinner />)}
      <SimpleGrid columns={3} spacing={10}>
        {userNeeds.map((need: any, i: number) => (
          <Box borderWidth="1px" key={i} maxW="sm" p="6" borderRadius="lg">
            <Flex height="100%" direction="column">
              <Box>
                <Text fontWeight="bold">
                  {need.name}
                </Text>
                <Badge color="blue.500">Pending</Badge>
                <Text noOfLines={5} color="gray.600">{need.description}</Text>
              </Box>
              <Spacer />
              <Box marginTop="24px">
                <UserNeed id={need.id} />
              </Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  )
}