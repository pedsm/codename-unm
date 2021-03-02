import {
  useToast,
  Text,
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
  ModalFooter,
  Select
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_USER_NEED, GET_STAKEHOLDERS, GET_USER_NEEDS } from '../gql'

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
  const { data, loading, error } = useQuery(GET_STAKEHOLDERS)
  const [addUserNeed] = useMutation(ADD_USER_NEED, {
    refetchQueries: [{ query: GET_USER_NEEDS }]
  });
  const stakeholders = data?.stakeholders || []
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
  console.log(form)
  return (
    <>
      <IconButton icon={<AddIcon/>} m="12px 0" aria-label="Add User Need" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create user need</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text m="5px" fontWeight="bold">As a</Text>
            <Select onChange={setValue} name="stakeholderId" m="5px">
              <option selected disabled>Select a stakeholder...</option>
              {stakeholders.map((stakeholder:any, i:number) => (
                <option key={i} value={stakeholder.id}>{stakeholder.name}</option>
              ))}
            </Select>
            <Input onChange={setValue} m="5px" name="name" placeholder="Title" size="md" />
            <Textarea onChange={setValue} m="5px" name="description" placeholder="Description" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={submit}>Create User Need</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}