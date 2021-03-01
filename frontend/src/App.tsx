import { Heading, Grid, GridItem } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"

function App() {
  return (
    <div className="App">
      <header style={{padding: '1em'}} className="App-header">
        <Heading><CheckCircleIcon/> Codename UNM</Heading>
      </header>
      <Grid
        templateColumns="200px auto"
      >
        <GridItem>Menu</GridItem>
        <GridItem>mainContent</GridItem>
      </Grid>
    </div>
  );
}

export default App;
