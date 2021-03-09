import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Button,
  ModalFooter,
  IconButton
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_NEED, DELETE_USER_NEED, GET_USER_NEEDS, UPDATE_NEED_STATUS } from '../gql'
import NeedStatusBadge, { NeedStatus } from '../components/NeedStatusBadge'

const statuses = Object.entries(NeedStatus).slice(0, Object.entries(NeedStatus).length / 2)

export default function UserNeed({ id }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loading, error, data } = useQuery(GET_USER_NEED, {
    variables: { id }
  })
  const [deleteUserNeed] = useMutation(DELETE_USER_NEED, {
    refetchQueries: [{ query: GET_USER_NEEDS }],
  })
  const [updateStatus] = useMutation(UPDATE_NEED_STATUS, {
    refetchQueries: [{ query: GET_USER_NEEDS }, { query: GET_USER_NEED, variables: { id } }],
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
                  <NeedStatusBadge status={userNeed.status} />
                  <Text color="gray.600">{userNeed?.description}</Text>
                  <Text mt="24px" fontWeight="bold">Stakeholder:</Text>
                  <Text fontWeight="bold">{userNeed?.stakeholder?.name}</Text>
                  <Text color="gray.600">{userNeed?.stakeholder?.description}</Text>
                </>
              )}
          </ModalBody>
          <ModalFooter>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Set Status
              </MenuButton>
              <MenuList>
                {statuses.map(([key, value]: any) => (
                  <MenuItem onClick={() => {
                    console.log({
                      id: userNeed.id,
                      newStatus: value
                    }

                    )
                    updateStatus({
                      variables: {
                        id: userNeed.id,
                        newStatus: value
                      }
                    })
                  }} key={key}>{value.replace('_', ' ')}</MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Link to={`/stakeholder/${userNeed?.stakeholder?.id}`}>
              <Button>View stakeholder</Button>
            </Link>
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