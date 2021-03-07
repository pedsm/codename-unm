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
import { ViewIcon } from '@chakra-ui/icons'
import { Spinner } from "@chakra-ui/react"
import { useQuery } from '@apollo/client'
import { GET_STAKEHOLDERS } from '../gql'
import UserNeed from '../modals/viewUserNeedModal'
import AddStakeholderModal from '../modals/addStakeholderModal'
import { Link } from 'react-router-dom'


export default function Stakeholders() {
  const { loading, error, data } = useQuery(GET_STAKEHOLDERS)

  const userNeeds = data?.stakeholders || []

  return (
    <div>
      <Heading m="20px 0"><ViewIcon /> Stakeholders 
        {loading && (<Spinner />)}
      </Heading>
      <AddStakeholderModal />
      <SimpleGrid columns={3} spacing={10}>
        {userNeeds.map((stakeholder: any, i: number) => (
          <Box borderWidth="1px" key={i} maxW="sm" p="6" borderRadius="lg">
            <Flex height="100%" direction="column">
              <Box>
                <Text fontWeight="bold">
                  {stakeholder.name}
                </Text>
                <Text noOfLines={5} color="gray.600">{stakeholder.description}</Text>
                <Link to={`stakeholder/${stakeholder.id}`}>
                  <Button mt="24px">View more</Button>
                </Link>
              </Box>
              <Spacer />
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  )
}