import React, { useEffect, useState } from 'react';

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
    HStack,
} from '@chakra-ui/react';

import { ContentWrapper } from '../components/ContentWrapper';

import useUser from '../lib/useUser';
import { errorToast } from '../lib/toast';

const validateEmail = (emailToValidate: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailToValidate);
};

const LoggedInLanding: React.FC<{ user: any; logout: any }> = ({ user, logout }) => {
    return (
        <Stack>
            <Text>Logged In as: {user.email}</Text>
        </Stack>
    );
};
LoggedInLanding.displayName = 'LoggedInLanding';

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
            <ContentWrapper>
                <Center mt="16">
                    <Stack maxW="800px">
                        <Stack as={Flex} mb={4} px={4}>
                            {user ? (
                                <HStack alignSelf="flex-end">
                                    <Button
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </HStack>
                            ) : (
                                ''
                            )}

                            <Center>
                                <Image width="120px" height="120px" src="/openape-logo.svg" />
                            </Center>
                            <Text
                                color="gray.800"
                                fontSize="4xl"
                                fontWeight="bold"
                                mb={4}
                                textAlign="center"
                            >
                                Anyone, anywhere, can create and sell NFTs
                            </Text>
                            <Text
                                fontSize="2xl"
                                color="gray.700"
                                textAlign="center"
                                fontWeight="light"
                            >
                                Make any digital content ownable on the blockchain.
                            </Text>
                        </Stack>

                        <Center>
                            {user ? (
                                <LoggedInLanding user={user} logout={logout} />
                            ) : (
                                <LoggedOutLanding login={login} />
                            )}
                        </Center>
                    </Stack>
                </Center>
            </ContentWrapper>
        </>
    );
}

App.displayName = 'App';
