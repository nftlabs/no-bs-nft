import 'tailwindcss/tailwind.css';
import React from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from '../lib/Fonts';
import theme from '../chakraTheme';

import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaData } from '../components/MetaData';
import { Web3EagerConnector } from '../components/Web3EagerConnector';
import { ContractContext } from '../lib/ContractContext';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  return library;
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { NFT, BidExecutor } = pageProps;
  return (
    <>
      <MetaData />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Web3EagerConnector />
          <ContractContext.Provider value={[NFT, BidExecutor]}>
            <Component {...pageProps} />
          </ContractContext.Provider>
        </ChakraProvider>
      </Web3ReactProvider>
    </>
  );
}

export default App;
