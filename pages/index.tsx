import React, { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Stack,
  Flex,
  Image,
  Button,
  Input,
  Heading,
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

const LandingHero: React.FC<{ user: any; login: any }> = ({ user, login }) => {
  const router = useRouter();

  return (
    <Stack width="100vw" minH="40vh" p={12}>
      <Center>
        <HStack maxW="1000px">
          <Stack as={Flex} alignItems="center">
            <Heading size="2xl" p={4} variant="heading" textAlign="center">
              The simplest way to create and sell NFTs
            </Heading>
            <Text px={4} pb={4} variant="subheading" fontWeight="light">
              Create an account, and start minting NFTs
            </Text>
            {user ? (
              <Button width="50%" variant="gradient" onClick={() => router.push('/dashboard')}>
                Enter the Metaverse
              </Button>
            ) : (
              <Flex>
                <Input
                  placeholder="Email Address"
                  focusBorderColor="primary"
                  borderRadius="4px"
                  size="lg"
                  m={4}
                />
                <Button
                  m={4}
                  size="lg"
                  variant="gradient"
                  borderRadius="4px"
                  width="100px"
                  onClick={login}
                >
                  Get Started
                </Button>
              </Flex>
            )}
          </Stack>
          <Image p={8} width="400px" src="/openape_landing_hero.png" />
        </HStack>
      </Center>
    </Stack>
  );
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
      <LandingHeader user={user} logout={logout} />
      <LandingHero user={user} login={login} />
      <LandingSub1 />
      <LandingSub2 />
      <LandingSub3 />
      <LandingLogin user={user} login={login} />
      <LandingFooter />
    </>
  );
}

App.displayName = 'App';
