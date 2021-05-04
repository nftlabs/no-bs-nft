import React, { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Stack,
  Flex,
  Image,
  Button,
  Input,
  Spinner,
  Text,
  HStack,
} from '@chakra-ui/react';

import useUser from '../lib/useUser';
import { useRouter } from 'next/router';

const LandingHeader: React.FC<{ user: any; logout: any }> = ({ user, logout }) => {
  const router = useRouter();
  const buttonClick = useCallback(() => {
    if (user) {
      logout();
    } else {
      router.push('/login');
    }
  }, [user, router, logout]);

  return (
    <Stack width="100vw" height={16} p={4}>
      <Center>
        <HStack as={Flex} width="1000px">
          <HStack flexGrow={1}>
            <Image src="/openape_landing_logo.svg" mr={8} />
            <Text variant="default" p={6}>
              Features
            </Text>
            <Text variant="default" p={6}>
              FAQ
            </Text>
            <Text variant="default" p={6}>
              About
            </Text>
          </HStack>
          <Button
            variant="gradient"
            size="small"
            mb="8px"
            onClick={buttonClick}
            justifySelf="flex-end"
          >
            {user ? 'logout' : 'login'}
          </Button>
        </HStack>
      </Center>
    </Stack>
  );
};

LandingHeader.displayName = 'LandingHeader';

const LandingHero: React.FC<{}> = () => {
  return <Stack width="100vw" minH={16} background="white"></Stack>;
};

LandingHero.displayName = 'LandingHero';

const LandingSub1: React.FC<{}> = () => {
  return <Stack width="100vw" minH={16} background="black"></Stack>;
};

LandingSub1.displayName = 'LandingSub1';

const LandingSub2: React.FC<{}> = () => {
  return <Stack width="100vw" minH={16} background="white"></Stack>;
};

LandingSub2.displayName = 'LandingSub2';

const LandingSub3: React.FC<{}> = () => {
  return <Stack width="100vw" minH={16} background="black"></Stack>;
};

LandingSub3.displayName = 'LandingSub3';

const LandingLogin: React.FC<{ user: any; login: any }> = ({ user, login }) => {
  return <Stack width="100vw" minH={16} background="white"></Stack>;
};

LandingLogin.displayName = 'LandingLogin';

const LandingFooter: React.FC<{}> = () => {
  return <Stack width="100vw" minH={16} background="black"></Stack>;
};

LandingFooter.displayName = 'LandingFooter';

export default function App(): JSX.Element {
  const { user, login, logout, loading } = useUser();

  if (loading) {
    return (
      <Stack height="100vh" width="100vw">
        <Center height="100vh" width="100vw">
          <Spinner />
        </Center>
      </Stack>
    );
  }

  return (
    <>
      <LandingHeader user={user} login={login} logout={logout} />
      <LandingHero />
      <LandingSub1 />
      <LandingSub2 />
      <LandingSub3 />
      <LandingLogin user={user} login={login} />
      <LandingFooter />
    </>
  );
}

App.displayName = 'App';
