import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import {
  Center,
  Image,
  Flex,
  Stack,
  Button,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';

import useUser from '../lib/useUser';
import { errorToast } from '../lib/toast';
import { compileERC721 } from '../lib/compile';

export const getStaticProps: GetStaticProps = async (context) => {
  const { NFT, BidExecutor } = await compileERC721();

  return {
    props: {
      NFT,
      BidExecutor,
    },
  };
};

const validateEmail = (emailToValidate: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailToValidate);
};

const LoggedOutLanding: React.FC<{ login: any }> = ({ login }) => {
  const [email, setEmail] = useState<string>('');

  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authLoadingText, setAuthLoadingText] = useState<string>('');

  const toast = useToast();

  const onboardUser = async () => {
    setAuthLoadingText('Entering the metaverse');
    setAuthLoading(true);

    try {
      await login(email);
    } catch (err) {
      errorToast(toast, 'Something went wrong. Please try again.');
      console.log(err);
    }

    setAuthLoading(false);
    setAuthLoadingText('');
  };

  return (
    <Stack>
      <Input
        border="1px"
        borderColor="black"
        placeholder="Enter your email address"
        width="320px"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorBorderColor="crimson"
        isInvalid={email !== '' && !validateEmail(email)}
      />
      <Button
        onClick={onboardUser}
        className="border-2 border-black bg-white shadow-md rounded-lg h-10"
      >
        {!authLoading ? (
          'Enter the Metaverse'
        ) : (
          <Flex flexDir="row" justify="center" alignItems="center">
            <Spinner size="sm" />
            <Text mx={2}>{authLoadingText}</Text>
          </Flex>
        )}
      </Button>
    </Stack>
  );
};

LoggedOutLanding.displayName = 'LoggedOutLanding';

export default function App(): JSX.Element {
  const { user, login, logout, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
      <Flex
        flexDir="column"
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Center>
          <Image m={4} width="240px" src="/openape_landing_logo.svg" />
        </Center>
        <Center>
          <LoggedOutLanding login={login} />
        </Center>
      </Flex>
    </>
  );
}

App.displayName = 'App';
