import {
  Text,
  Box,
  Spacer,
  Flex,
} from '@chakra-ui/react'
import NeedStatusBadge from '../components/NeedStatusBadge'
import UserNeedModal from '../modals/viewUserNeedModal'

export default function UserNeed({ need }: any) {
  return (
    <Box borderWidth="1px" maxW="sm" p="6" borderRadius="lg">
      <Flex height="100%" direction="column">
        <Box>
          <Text color="gray.500">
            {need.stakeholder?.name}
          </Text>
          <Text fontWeight="bold">
            #{need.id} {need.name}
          </Text>
          <NeedStatusBadge status={need.status} />
          <Text noOfLines={5} color="gray.600">{need.description}</Text>
        </Box>
        <Spacer />
        <Box marginTop="24px">
          <UserNeedModal id={need.id} />
        </Box>
      </Flex>
    </Box>
  )
}