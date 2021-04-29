import React, { useState } from 'react';
import Image from 'next/image';

import {
  HamburgerIcon
} from '@chakra-ui/icons';
import {
  Center, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Stack,
  Avatar,
  Button
} from '@chakra-ui/react'

import { ContentWrapper } from 'components/ContentWrapper';


const CollectionRow = ({collection}: any): JSX.Element => {
  const { collectionBanner, title, symbol, creatorUsername } = collection;
  return (
    <div className="flex justify-start items-center border-b-2 border-gray-200 py-4">
      
      <div className="mr-4 rounded-full overflow-hidden">
        <Avatar 
          src={collectionBanner}
          name={title}        
        />
      </div>
      
      <div className="flex flex-col justify-center w-48">
        <p className="text-lg text-gray-800 font-normal">
          {title}
        </p>

        <p className="text-md text-gray-800 font-light">
          {`$${symbol} by ${creatorUsername}`}
        </p>
      </div>
    
    </div>
  )
}

export default function Dashboard(): JSX.Element {

  const [collections, setCollections] = useState<any[]>([]);

  const dummyCollection = {
    collectionBanner: '/test-art.jpg',
    title: "COLORISMS",
    symbol: "COL",
    creatorUsername: "@rin"
  }

  return (
    <>
      <ContentWrapper>
        <div className="mt-8 mb-4">
          <div className="flex justify-between px-4 items-center">
            <p className="text-gray-800 text-4xl font-black">
              Collections
            </p>

            <HamburgerIcon h={8} w={8} color="gray.600"/>
          </div>
        </div>

        <div className="border border-black mb-16" style={{height: "480px"}}>
          <Center>
            <Tabs>
              <TabList>
                <Tab>Your collections</Tab>
                <Tab isDisabled>Bookmarked</Tab>              
              </TabList>

              <TabPanels>
                <TabPanel>

                  <Center>
                    <Stack>

                      {collections.length > 0
                        ? (
                          collections.map((col) => {
                            return (
                              <CollectionRow collection={col} key={col.title}/>
                            )
                          })
                        )

                        : (
                          <p className="text-lg text-gray-800 font-light">
                            No collections created yet!
                          </p>
                        )
                      }

                    </Stack>
                  </Center>

                </TabPanel>

                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                
              </TabPanels>
            </Tabs>
          </Center>
        </div>

        <Center>
          <Button
            px="16"
            className="border-2 border-black bg-white shadow-md rounded-lg h-10"
          >
            Create a collection
          </Button>
        </Center>
      </ContentWrapper>
    </>
  )
}