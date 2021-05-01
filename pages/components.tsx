import { Flex, Button, Text } from "@chakra-ui/react";

export default function Components() {
  return (
    <Flex 
      padding="40px"
      width="100vw" 
      height="100vh"
      flexWrap="wrap"
    >
      <Flex direction="column">
        <Text variant="heading" mb="8px">
          Buttons
        </Text>
        <Flex>
          <Flex direction="column" mr="20px">
            <Button 
              variant="gradient" 
              size="medium"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="primary" 
              size="medium"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="dark" 
              size="medium"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="normal" 
              size="medium"
            >
              Click me
            </Button>
          </Flex>

          <Flex direction="column">
            <Button 
              variant="gradient" 
              size="small"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="primary" 
              size="small"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="dark" 
              size="small"
              mb="8px"
            >
              Click me
            </Button>
            <Button 
              variant="normal" 
              size="small"
            >
              Click me
            </Button>
          </Flex>
        </Flex>
      </Flex>
      
    </Flex>
  )
}