import React from 'react';
import Image from 'next/image'

import { SettingsIcon } from '@chakra-ui/icons';
import {
  Stack,
  Link,
  HStack,
  Center,
} from "@chakra-ui/react"
import { ContentWrapper } from 'components/ContentWrapper';

export default function Dashboard(): JSX.Element {
  
  return (
    <>
      <ContentWrapper>
        <Center px="8" mt="16">
          <Stack width="full">
            <div className="flex justify-between items-baseline">
              <p className="text-4xl text-gray-800 font-black">
                Your NFTs
              </p>

              <SettingsIcon />
            </div>            
          </Stack>
        </Center>

        <Center px="8" mt="16">
          <Stack width="full">
            <p className="text-4xl text-gray-800 font-black">
              Collections
            </p>           
          </Stack>
        </Center>
      </ContentWrapper>
    </>
  )
}