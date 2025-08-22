import { Button, HStack } from '@chakra-ui/react'

export default function GatchaActions() {
  return (
    <>
      <HStack gap={4}>
        <Button bg="primary" fontSize="xl" p={5} borderRadius={10}>
          Tirar 1
        </Button>
        <Button bg="primary" fontSize="xl" p={5} borderRadius={10}>
          Tirar 10
        </Button>
      </HStack>
    </>
  )
}
