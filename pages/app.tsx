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
import Home from "components/app/home";
import Create from "components/app/create";

export default function Dashboard(): JSX.Element {
  
  const [view, setView] = useState<string>('home');

  enum Routes {
    Home = "home",
    Create = "create",
    Explore = "explore"
  }

  const pageViews: any = {
    "home": <Home setView={setView}/>,
    "create": <Create setView={setView}/>
  }

  return (
    <>
      <ContentWrapper>
        {pageViews[view]}
      </ContentWrapper>
      <div 
        className="lg:w-20 lg:items-center lg:p-4 lg:rounded-full lg:shadow-lg lg:flex-col lg:right-8 xl:right-32 lg:bottom-48 w-full flex flex-row justify-between py-4 px-8 fixed bottom-0 border border-gray-500 bg-white"
      >
        <div className={`lg:my-4 ${view == Routes.Home ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => setView(Routes.Home)}>
            <Stack>
              <Center>
                <Image 
                  src="/home.svg"
                  height={24}
                  width={24}                
                />
              </Center>
              <p className="text-center text-gray-800">
                Home
              </p>
            </Stack>
          </Button>          
        </div>

        <div className={`lg:my-4 ${view == Routes.Create ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => setView(Routes.Create)}>
            <Stack>
              <Center>
                <Image 
                  src="/plus-square.svg"
                  height={24}
                  width={24}
                />
              </Center>
              <p className="text-center text-gray-800">
                Create
              </p>
            </Stack>
          </Button>          
        </div>

        <div className={`lg:my-4 ${view == Routes.Explore ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => {}}>
            <Stack>
              <Center>
                <Image 
                  src="/search.svg"
                  height={24}
                  width={24}
                />
              </Center>
              <p className="text-center text-gray-800">
                Explore
              </p>
            </Stack>
          </Button>          
        </div>
        
      </div>
    </>
  )
}