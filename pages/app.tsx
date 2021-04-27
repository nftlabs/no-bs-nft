import React, { useState } from 'react';

import { ContentWrapper } from 'components/ContentWrapper';
import Home from "components/app/home";
import Create from "components/app/create";
import AppNavbar from 'components/AppNavbar';

export default function Dashboard(): JSX.Element {
  
  const [view, setView] = useState<string>('home');

  const pageViews: any = {
    "home": <Home setView={setView}/>,
    "create": <Create setView={setView}/>
  }

  return (
    <>
      <ContentWrapper>
        {pageViews[view]}
      </ContentWrapper>
      <AppNavbar view={view} setView={setView}/>
    </>
  )
}