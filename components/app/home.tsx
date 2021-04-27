import React, { useState } from 'react';
import Image from 'next/image'

import {
  Stack,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react"
import { ContentWrapper } from 'components/ContentWrapper';

export default function Home({setView}: any): JSX.Element {

  const [NFTs, setNFTs] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  return (
    <>
      <div className="mb-32">
        <ContentWrapper>
          <Center mt="8">
            <Stack width="full" spacing="8">
              <div className="flex justify-between items-baseline">
                <p className="text-4xl text-gray-800 font-black">
                  Your NFTs
                </p>

                <Image 
                  src="/settings.svg"
                  width={24}
                  height={24}
                />
              </div>

              <Stack>
                <p className="text-center text-lg mb-4">
                  Looks like you own no NFTs!
                </p>
                
                <Center>
                  <button onClick={() => setView("create")}>                  
                    <div className="flex flex-col">
                      <p className="text-center text-lg">
                        Create an NFT
                      </p>                      
                      <div className="h-0.5 border border-black bg-black shadow-pink" />                                            
                    </div>
                  </button>
                </Center>

                <p className="text-center text-lg">
                  or
                </p>

                <Center>
                  <button onClick={() => {}}>                  
                    <div className="flex flex-col">
                      <p className="text-center text-lg">
                        Buy an NFT
                      </p>                      
                      <div className="h-0.5 border border-black bg-black shadow-pink" />                                            
                    </div>
                  </button>
                </Center>

              </Stack>
            </Stack>
          </Center>

          <Center mt="8">
            <Stack width="full" spacing="8">
              <p className="text-4xl text-gray-800 font-black">
                Collections
              </p>           
            

              <Stack>
                <p className="text-center text-lg mb-4">
                  {`You haven't saved any collections!`}
                </p>
                
                <Center>
                  <button onClick={() => {}}>                  
                    <div className="flex flex-col">
                      <p className="text-center text-lg">
                        Create an NFT collection
                      </p>                      
                      <div className="h-0.5 border border-black bg-black shadow-pink" />                                            
                    </div>
                  </button>
                </Center>

                <p className="text-center text-lg">
                  or
                </p>

                <Center>
                  <button onClick={() => {}}>                  
                    <div className="flex flex-col">
                      <p className="text-center text-lg">
                        Explore NFT collections
                      </p>                      
                      <div className="h-0.5 border border-black bg-black shadow-pink" />                                            
                    </div>
                  </button>
                </Center>
              </Stack>
            </Stack>
          </Center>
        </ContentWrapper>
      </div>
    </>
  )
}