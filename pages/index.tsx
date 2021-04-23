import React,  { useState } from 'react';

import {
  Center, 
  Stack,
  Button,
  Input
} from '@chakra-ui/react'

import { ContentWrapper } from 'components/ContentWrapper';

import useUser from 'lib/useUser';

export default function App(): JSX.Element {

  const { user, login, logout } = useUser();
  const [email, setEmail] = useState<string>('');

  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authLoadingText, setAuthLoadingText] = useState<string>('');

  const onboardUser = async () => {
    // Magic auth + onboard user.publicAddress on SkyDB
  }

  return (
    <>      
      <ContentWrapper>
        <Center mt="16">
          <Stack maxW="800px">
            <div className="mb-4 px-4">
              <p className="text-5xl md:text-6xl text-gray-800 font-bold lg:font-black mb-4 leading-snug lg:leading-snug text-center">
                Anyone, anywhere, can create and sell NFTs
              </p>
              <p className="text-2xl text-gray-700 font-light text-center">
                Create and sell NFTs all in one simple interface.
              </p>
            </div>

            <Center>
              <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
                <Input
                  border="1px"
                  borderColor="black" 
                  placeholder="Enter your email address"
                  // maxW="320px"
                />
                <Button
                  variant="outline"
                  width="320px"
                  border="2px"
                  borderColor="black"
                  shadow="md" 
                  my="2"
                  mx="2"           
                >
                  Enter the metaverse!
                </Button>
              </div>
            </Center>
          </Stack>
        </Center>
      </ContentWrapper>
    </>
  )
}