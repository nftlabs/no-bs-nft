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
      <div className="w-full flex flex-row justify-between p-8 fixed bottom-0 border border-red-500 bg-white">
        <Button variant="link" onClick={() => setView(Routes.Home)}>
          Home
        </Button>
        <Button variant="link" onClick={() => setView(Routes.Create)}>
          Create
        </Button>
        <Button variant="link">
          Sell
        </Button>
        <Button variant="link">
          Explore
        </Button>
      </div>
    </>
  )
}