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
        <HStack as={Flex} width="100%" maxW="1000px">
          <HStack flexGrow={1}>
            <Image src="/openape_landing_logo.svg" mr={8} />
            <Text variant="default" p={6} display={['none', 'block']}>
              Features
            </Text>
            <Text variant="default" p={6} display={['none', 'block']}>
              FAQ
            </Text>
            <Text variant="default" p={6} display={['none', 'block']}>
              About
            </Text>
          </HStack>
          {user ? (
            <Button
              variant="gradient"
              size="small"
              mb="8px"
              onClick={buttonClick}
              justifySelf="flex-end"
            >
              Logout
            </Button>
          ) : (
            ''
          )}
        </HStack>
      </Center>
    </Stack>
  );
};

LandingHeader.displayName = 'LandingHeader';

const LandingHero: React.FC<{ user: any; login: any }> = ({ user, login }) => {
  const router = useRouter();

  return (
    <Stack width="100vw" minH="40vh" p={[4, 12]}>
      <Center>
        <Stack as={Flex} flexDir={['column-reverse', 'row']} width="100%" maxW="1000px">
          <Stack as={Flex} alignItems="center" textAlign="center">
            <Heading size="2xl" p={4} variant="heading">
              The simplest way to create and sell NFTs
            </Heading>
            <Text px={4} pb={4} variant="subheading" fontWeight="light">
              Create an account, and start minting NFTs
            </Text>
            <Button
              size="medium"
              width="50%"
              variant="gradient"
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          </Stack>
          <Center>
            <Image p={[4, 12]} width={['200px', '400px']} src="/openape_landing_hero.png" />
          </Center>
        </Stack>
      </Center>
    </Stack>
  );
};

LandingHero.displayName = 'LandingHero';

const LandingSub1: React.FC<{}> = () => {
  return (
    <Stack width="100vw" minH="40vh">
      <Center>
        <Stack
          as={Flex}
          flexDir={['column-reverse', 'row']}
          width="100%"
          maxW="1000px"
          alignItems="center"
          pt={8}
        >
          <Stack as={Flex} alignItems="center" width="100%" maxWidth="500px" textAlign="center">
            <Heading p={4} variant="subheading">
              Easily create collections and NFTs
            </Heading>
            <Text px={4} pb={4} variant="default" fontWeight="light">
              Upload, create and mint all for free
            </Text>
          </Stack>
          <Image p={[2, 8]} width={['200px', '400px']} src="/openape_landing_second.png" />
        </Stack>
      </Center>
    </Stack>
  );
};

LandingSub1.displayName = 'LandingSub1';

const LandingSub2: React.FC<{}> = () => {
  return (
    <Stack width="100vw" minH="40vh">
      <Center>
        <Stack
          as={Flex}
          flexDir={['column', 'row']}
          width="100%"
          maxW="1000px"
          alignItems="center"
          pt={8}
        >
          <Image p={[2, 8]} width={['200px', '400px']} src="/openape_landing_third.png" />
          <Stack
            p={8}
            as={Flex}
            alignItems="center"
            width="100%"
            maxWidth="500px"
            textAlign="center"
          >
            <Heading p={4} variant="subheading">
              Showcase your collection
            </Heading>
            <Text px={4} pb={4} variant="default" fontWeight="light">
              In just a few clicks - you can show off all of your super cool NFT’s with a custom
              link!
            </Text>
          </Stack>
        </Stack>
      </Center>
    </Stack>
  );
};
LandingSub2.displayName = 'LandingSub2';

const LandingSub3: React.FC<{}> = () => {
  return (
    <Stack width="100vw" minH="40vh" pb={8}>
      <Center>
        <Stack
          as={Flex}
          flexDir={['column', 'row']}
          width="100%"
          maxW="1000px"
          alignItems="center"
          pt={8}
        >
          <Stack
            p={8}
            as={Flex}
            alignItems="center"
            width="100%"
            maxWidth="500px"
            textAlign="center"
          >
            <Heading p={4} variant="subheading">
              Buy and Sell
            </Heading>
            <Text px={4} pb={4} variant="default" fontWeight="light">
              Easily share your NFT link so others can buy, or browse what’s for sale!
            </Text>
          </Stack>
          <Image p={[2, 8]} width={['200px', '400px']} src="/openape_landing_fourth.png" />
        </Stack>
      </Center>
    </Stack>
  );
};

LandingSub3.displayName = 'LandingSub3';

const LandingLogin: React.FC<{ user: any; login: any }> = ({ user, login }) => {
  const router = useRouter();
  return (
    <Stack width="100vw" minH="20vh" background="gradient" p={12}>
      <Center>
        <Text variant="heading" color="white" mb={8} textAlign="center">
          Try OpenApe and start minting today
        </Text>
      </Center>
      <Center>
        <Button
          variant="normal"
          size="medium"
          onClick={() => {
            router.push('/login');
          }}
        >
          Let{"'"}s go
        </Button>
      </Center>
    </Stack>
  );
};

LandingLogin.displayName = 'LandingLogin';

const LandingFooter: React.FC<{}> = () => {
  return <Stack width="100vw" minH="20vh"></Stack>;
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
