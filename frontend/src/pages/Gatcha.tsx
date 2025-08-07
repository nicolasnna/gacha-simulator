import { Box, Button, Card, Container, Heading } from "@chakra-ui/react"

function Gatcha() {
  return (
    <Container centerContent py={2} spaceY={10}>
      <Box>
        <Heading size={"4xl"} color="text">Simulador de Gacha</Heading>
      </Box>

      <Box color="text">
        Monedas: 9000
      </Box>

      <Card.Root width={"18rem"} alignItems="center" bg="bg-secondary" border={0} >
        <Card.Header alignSelf="end">
          <img src="https://emojicdn.elk.sh/%E2%84%B9" width={25}/>
        </Card.Header>
        <Card.Body>
          <img src="https://emojicdn.elk.sh/%F0%9F%8E%81" width={120}/>
        </Card.Body>
        <Card.Footer spaceX={4}>
          <Button>Tirar 1</Button>
          <Button>Tirar 10</Button>
        </Card.Footer>
      </Card.Root>
      
    </Container>
  )
}

export default Gatcha