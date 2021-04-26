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
  
  enum Routes {
    Home = "home",
    Create = "create",
    Sell = "sell",
    Explore = "explore"
  }

  const pageViews: any = {
    "home": <Home />,
    "create": <Create />
  }

  const [view, setView] = useState<string>('home');

  return (
    <>
      <ContentWrapper>
        {pageViews[view]}
      </ContentWrapper>
      <div 
        className="lg:w-20 lg:items-center lg:p-4 lg:rounded-full lg:shadow-lg lg:flex-col lg:right-8 xl:right-32 lg:bottom-48 w-full flex flex-row justify-between p-8 fixed bottom-0 border border-gray-500 bg-white"
      >
        <div className="lg:my-4">        
          <Button variant="link" onClick={() => setView(Routes.Home)}>
            Home
          </Button>
        </div>
        <div className="lg:my-4">        
          <Button variant="link" onClick={() => setView(Routes.Create)}>
            Create
          </Button>
        </div>
        <div className="lg:my-4">        
          <Button variant="link" onClick={() => {}}>
            Sell
          </Button>
        </div>
        <div className="lg:my-4">        
          <Button variant="link" onClick={() => {}}>
            Explore
          </Button>
        </div>
      </div>
    </>
  )
}