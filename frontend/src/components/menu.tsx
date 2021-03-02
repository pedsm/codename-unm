import { Text, List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <List spacing={2}>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link to="/needs">User needs</Link>
      </ListItem>
      <ListItem>
        <Link to="/stakeholders">Stakeholders</Link>
      </ListItem>
    </List>
  )
}