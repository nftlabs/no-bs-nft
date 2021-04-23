import React from 'react';
import Image from 'next/image'

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Stack,
  Link,
  HStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { ContentWrapper } from 'components/ContentWrapper';

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />  
            <DrawerHeader>
              <p>
                Manage
              </p>
            </DrawerHeader>

            <DrawerBody>

              <Stack>
                <Link>
                  Your NFTs
                </Link>
                <Link>
                  Create an NFT
                </Link>               
                <Link>
                  Sales
                </Link>
              </Stack>

            </DrawerBody>            
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

function OnboardingModal(): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUsername = async () => {
    // Onboard user's username. Associate publicAddr with username.
  }
  
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>First, let's get you set up.</ModalHeader>
        <ModalBody>                
          <Stack mb="4">                
            <div className="flex flex-row justify-center items-center">
              <Input
                border="1px"
                borderColor="black" 
                placeholder="Enter your username"
                // maxW="400px"
              />
              <Button
                variant="outline"
                width="200px"
                border="2px"
                borderColor="black"
                shadow="md" 
                m="2"
                
                onClick={handleUsername}
              >
                Submit
              </Button>
            </div>
          </Stack>
        </ModalBody>                  
      </ModalContent>
    </Modal>
  )
}


export default function Dashboard(): JSX.Element {
  
  return (
    <>
      <div className="w-full flex justify-between py-4 sticky top-0 bg-white mb-8 border-b-2 border-gray-100 px-8">
        <HStack spacing="4">
          <Image
            src="/nftlabs-logo.png"
            width={32}
            height={38.635}
            priority={true}            
          />
          <p className="text-gray-800 font-black text-3xl ml-8 mr-8">
            No Bullshit NFT
          </p>
        </HStack>
        <Menu />
      </div>

      <ContentWrapper>
        {/* <OnboardingModal /> */}
        <Stack px="4" spacing="8">
          <Stack>
            <div className="flex justify-between text-gray-800 items-center">
              <p className="text-4xl lg:text-6xl font-black mb-4">
                Your NFTs
              </p>

              <Link>
                <p className="text-sm lg:text-md hover:underline text-gray-600">
                  View all
                </p>
              </Link>
            </div>

            <p>
              None.
            </p>
          </Stack>
          <Stack>
            <div className="flex justify-between items-center">
              <p className="text-4xl lg:text-6xl text-gray-800 font-black mb-4">
                Your Collections
              </p>

              <Link>
                <p className="text-sm lg:text-md hover:underline text-gray-600">
                  View all
                </p>
              </Link>
            </div>

            <p>
              None.
            </p>
          </Stack>
        </Stack>
      </ContentWrapper>
    </>
  )
}