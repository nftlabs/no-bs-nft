import React, { useState } from 'react';
import Image from 'next/image'

import { SettingsIcon } from '@chakra-ui/icons';
import {
  Stack,
  Link,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react"
import { ContentWrapper } from 'components/ContentWrapper';

export default function Home(): JSX.Element {

  const [NFTs, setNFTs] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  return (
    <>
      <ContentWrapper>
        <Center mt="16">
          <Stack width="full" spacing="8">
            <div className="flex justify-between items-baseline">
              <p className="text-4xl text-gray-800 font-black">
                Your NFTs
              </p>

              <SettingsIcon />
            </div>

            <Stack>
              <p className="text-center text-lg mb-4">
                Looks like you own no NFTs!
              </p>
              
              <Center>
                <button className="border-2 border-black bg-white shadow-md rounded-full h-10 w-64">
                  Create an NFT
                </button>
              </Center>

              <p className="text-center text-lg">
                or
              </p>

              <Center>
                <button className="border-2 border-black bg-white shadow-md rounded-full h-10 w-64">
                  Buy an NFT
                </button>
              </Center>

            </Stack>
          </Stack>
        </Center>

        <Center mt="8" mb="16">
          <Stack width="full" spacing="8">
            <p className="text-4xl text-gray-800 font-black">
              Collections
            </p>           
          

            <Stack>
              <p className="text-center text-lg mb-4">
                {`You haven't saved any collections!`}
                </p>
              
              <Center>
                <button className="border-2 border-black bg-white shadow-md rounded-full h-10 w-64">
                  Create an NFT collection
                </button>
              </Center>

              <p className="text-center text-lg">
                or
              </p>

              <Center>
                <button className="border-2 border-black bg-white shadow-md rounded-full h-10 w-64">
                  Explore NFT collections
                </button>
              </Center>
            </Stack>
          </Stack>
        </Center>
      </ContentWrapper>
    </>
  )
}