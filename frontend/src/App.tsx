import { Heading, Grid, GridItem, Container } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from './components/menu'
import Needs from './pages/needs'
import Stakeholders from './pages/stakeholders'
import Stakeholder from './pages/stakeholder'

function App() {
  return (
    <Router>
      <Container maxWidth={"1200px"}>
        <header style={{ padding: '1em' }} className="App-header">
          <Heading><CheckCircleIcon /> Codename UNM</Heading>
        </header>
        <Grid
          templateColumns="200px auto"
        >
          <GridItem>
            <Menu />
          </GridItem>
          <GridItem>
            <Switch>
              <Route exact path="/">
                HomePage
              </Route>
              <Route path="/needs">
                <Needs />
              </Route>
              <Route path="/stakeholder/:id">
                <Stakeholder />
              </Route>
              <Route path="/stakeholders">
                <Stakeholders />
              </Route>
            </Switch>
          </GridItem>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
