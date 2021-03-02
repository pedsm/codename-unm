import {
  useToast,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Input,
  Textarea,
  useDisclosure,
  Button,
  IconButton,
  ModalFooter
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'
import { useForm } from '../hooks'
import { ADD_STAKEHOLDER, GET_STAKEHOLDERS } from '../gql'

export default function AddStakeholderModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { form, setValue } = useForm()
  const toast = useToast()
  const [addUserNeed] = useMutation(ADD_STAKEHOLDER, {
    refetchQueries: [{ query: GET_STAKEHOLDERS }]
  });
  function submit() {
    // console.log(form)
    addUserNeed({ variables: form })
    toast({
      title: "Stakeholder created",
      description: `"${form.name}" has been created`,
      status: "success",
      duration: 10000,
      isClosable: true,
    })
    onClose()
  }
  return (
    <>
      <IconButton icon={<AddIcon/>} m="12px 0" aria-label="Add User Need" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Stakeholder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={setValue} name="name" m="5px" placeholder="Title" size="md" />
            <Textarea onChange={setValue} name="description" m="5px" placeholder="Description" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={submit} m="5px">Create Stakeholder</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}