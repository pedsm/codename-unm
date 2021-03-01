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
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER_NEED, GET_USER_NEEDS } from '../gql'

function useForm(): any {
  const [form, setForm] = useState({})
  function setValue(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return { form, setValue }
}

export default function AddUserNeedModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { form, setValue } = useForm()
  const toast = useToast()
  const [addUserNeed] = useMutation(ADD_USER_NEED, {
    refetchQueries: [{ query: GET_USER_NEEDS }]
  });
  function submit() {
    // console.log(form)
    addUserNeed({ variables: form })
    toast({
      title: "User need created.",
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
          <ModalHeader>Create user need</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={setValue} name="name" m="5px" placeholder="Title" size="md" />
            <Textarea onChange={setValue} name="description" m="5px" placeholder="Description" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={submit} m="5px">Create User Need</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}