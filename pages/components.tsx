import { Flex, Button, Heading, Text } from "@chakra-ui/react";

export default function Components() {
  return (
    <Flex 
      padding="40px"
      width="100vw" 
      height="100vh"
      flexWrap="wrap"
    >
      <Flex direction="column" mr="40px">
        <Heading>
          Large Heading
        </Heading>
        <Text variant="heading" mb="8px" mt="8px">
          Heading
        </Text>
        <Text variant="subheading" mb="8px">
          Subeading
        </Text>
        <Text variant="primary" mb="8px">
          This is a more prominent description text since it is solid black.
        </Text>
        <Text variant="default" mb="8px">
          This is a standard description text. It’s much easier on the eyes also.
        </Text>
      </Flex>

      <Flex direction="column" marginX="40px">
        <Text variant="heading" mb="8px">
          Buttons
        </Text>
        <Flex>
          <Flex direction="column" mr="20px">
            <Text variant="subheading">Medium</Text>
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
            <Text variant="subheading">Small</Text>
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
      
      <Flex direction="column" marginX="40px">
        <Text variant="heading" mb="8px">
          Inputs
        </Text>
      </Flex>

    </Flex>
  )
}