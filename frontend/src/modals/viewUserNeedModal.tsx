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
  // const { form, setValue } = useForm()
  // const toast = useToast()
  // const [addUserNeed] = useMutation(ADD_USER_NEED, {
  //   refetchQueries: [{ query: GET_USER_NEEDS }]
  // });
  // function submit() {
  //   // console.log(form)
  //   addUserNeed({ variables: form })
  //   toast({
  //     title: "User need created.",
  //     description: `"${form.name}" has been created`,
  //     status: "success",
  //     duration: 10000,
  //     isClosable: true,
  //   })
  //   onClose()
  // }
  return (
    <>
      <Button onClick={onOpen}>View more</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{loading ? "Loading" : userNeed?.name || "Lo"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading 
            ? (<Spinner />)
            : (
              <>
                <Badge color="blue.500">Pending</Badge>
                <Text color="gray.600">{userNeed?.description}</Text>
              </>
            )}

            
          </ModalBody>
          <ModalFooter>
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