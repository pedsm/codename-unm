import {
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Spinner,
  Text,
  useDisclosure,
  Button,
  ModalFooter,
  IconButton
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_NEED, DELETE_USER_NEED, GET_USER_NEEDS } from '../gql'


export default function UserNeed({ id }:any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loading, error, data } = useQuery(GET_USER_NEED, {
    variables: { id }
  })
  const [deleteUserNeed] = useMutation(DELETE_USER_NEED, {
    refetchQueries: [{ query: GET_USER_NEEDS }],
  })

  const userNeed = data?.userNeed
  return (
    <>
      <Button onClick={onOpen}>View more</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{loading ? "Loading" : userNeed?.name || "..."}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading 
            ? (<Spinner />)
            : (
              <>
                <Badge color="blue.500">Pending</Badge>
                <Text color="gray.600">{userNeed?.description}</Text>
                <Text mt="24px" fontWeight="bold">Stakeholder:</Text>
                <Text fontWeight="bold">{userNeed?.stakeholder?.name}</Text>
                <Text color="gray.600">{userNeed?.stakeholder?.description}</Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button disabled>View stakeholder</Button>
            <IconButton 
              aria-label="Delete User Need" 
              icon={<DeleteIcon />}
              onClick={() => {
                deleteUserNeed({
                  variables: { id }
                })
                onClose()
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}