import React from 'react';
import { Flex, Button, Heading, Text, Input, Image } from '@chakra-ui/react';

export default function Components() {
  return (
    <Flex padding="40px" width="100vw" height="100vh" flexWrap="wrap">
      <Flex direction="column" marginX="40px">
        <Heading>Large Heading</Heading>
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
          Color Palette
        </Text>
        <Flex>
          <Pane color="gradient" />
          <Pane color="primary" />
          <Pane color="violet" />
        </Flex>
        <Flex>
          <Pane color="gray.darkest" />
          <Pane color="gray.dark" />
          <Pane color="gray.medium" />
          <Pane color="gray.light" />
          <Pane color="gray.lightest" />
        </Flex>
      </Flex>

      <Flex direction="column" marginX="40px">
        <Text variant="heading" mb="8px">
          Buttons
        </Text>
        <Flex>
          <Flex direction="column" mr="20px">
            <Text variant="subheading">Medium</Text>
            <Button variant="gradient" size="medium" mb="8px">
              Click me
            </Button>
            <Button variant="primary" size="medium" mb="8px">
              Click me
            </Button>
            <Button variant="dark" size="medium" mb="8px">
              Click me
            </Button>
            <Button variant="normal" size="medium">
              Click me
            </Button>
          </Flex>

          <Flex direction="column">
            <Text variant="subheading">Small</Text>
            <Button variant="gradient" size="small" mb="8px">
              Click me
            </Button>
            <Button variant="primary" size="small" mb="8px">
              Click me
            </Button>
            <Button variant="dark" size="small" mb="8px">
              Click me
            </Button>
            <Button variant="normal" size="small">
              Click me
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" marginX="40px">
        <Text variant="heading" mb="8px">
          Inputs
        </Text>
        <Flex direction="column">
          <Flex direction="column" mb="8px">
            <Text variant="label">Username</Text>
            <Input placeholder="Input with label" focusBorderColor="primary" />
          </Flex>

          <Input placeholder="Enter input here" focusBorderColor="primary" mb="8px" />

          <Input value="Here is an input" focusBorderColor="primary" mb="8px" />

          <Flex>
            <Input
              placeholder="Input with button"
              focusBorderColor="primary"
              borderRadius="4px 0px 0px 4px"
            />
            <Button size="small" variant="gradient" borderRadius="0px 4px 4px 0px" width="100px">
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" marginX="40px">
        <Text variant="heading" mb="8px">
          Cards
        </Text>
        <Flex
          variant="card"
          height="200px"
          width="500px"
          borderRadius="8px"
          padding="20px"
          direction="column"
          position="relative"
          boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
        >
          <Image
            position="absolute"
            top="20px"
            right="20px"
            width="100px"
            height="100px"
            borderRadius="4px"
            src="https://d15omoko64skxi.cloudfront.net/wp-content/uploads/2018/01/beeple.jpg"
          />

          <Text variant="subheading">Example title</Text>
          <Text variant="default" mt="4px" width="300px">
            This is an example card description. You can use it to describe the card.
          </Text>

          <Button position="absolute" variant="gradient" size="small" bottom="20px">
            Do something
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Pane({ color }) {
  return (
    <Flex direction="column" mr="8px" mb="8px">
      <Text fontSize="12px" color="#666">
        {color}
      </Text>
      <Flex height="80px" width="80px" borderRadius="4px" bg={color} />
    </Flex>
  );
}
