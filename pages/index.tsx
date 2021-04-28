import React,  { useEffect, useState } from 'react';

import {
    Center, 
    Stack,
    Button,
    Input,
    Spinner,
    useToast
} from '@chakra-ui/react'

import { ContentWrapper } from '../components/ContentWrapper';

import useUser from '../lib/useUser';
import { errorToast } from '../lib/toast';

export default function App(): JSX.Element {

    const { user, login, logout, loading } = useUser();
    const [email, setEmail] = useState<string>('');

    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const [authLoadingText, setAuthLoadingText] = useState<string>('');

    const toast = useToast();

    const onboardUser = async () => {
        setAuthLoadingText('Entering the metaverse')
        setAuthLoading(true);

        try {
            await login(email);
        } catch(err) {
            errorToast(
                toast,
                "Something went wrong. Please try again."
            )
            console.log(err)
        }

        setAuthLoading(false)
        setAuthLoadingText('');
    }

    function validateEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if(loading){
        return (<Stack height="100vh" width="100vw">
            <Center height="100vh" width="100vw">
                <Spinner/>
            </Center>
        </Stack>)
    }

    return (
        <>
            <ContentWrapper>
                <Center mt="16">
                    <Stack maxW="800px">
                        <div className="mb-4 px-4">
                            <p className="text-5xl md:text-6xl text-gray-800 font-bold lg:font-black mb-4 leading-snug lg:leading-snug text-center">
                                Anyone, anywhere, can create and sell NFTs
                            </p>
                            <p className="text-xl text-gray-700 font-light text-center">
                                Make any digital content ownable on the blockchain.
                            </p>
                        </div>

                        <Center>
                            {user ? (<>I'm logged in</>) : (<Stack>
                        <Input
                            border="1px"
                            borderColor="black"
                            placeholder="Enter your email address"
                            width="320px"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            errorBorderColor="crimson"
                            isInvalid={email != '' && !validateEmail(email)}
                        />
                        <Button
                            onClick={onboardUser}
                            className="border-2 border-black bg-white shadow-md rounded-lg h-10"
                        >
                            {!authLoading
                                ? (
                                    "Enter the Metaverse"
                                )

                                : (
                                    <div className="flex flex-row justify-center items-center">
                                        <Spinner size="sm" />
                                        <p className="mx-2">
                                            {authLoadingText}
                                        </p>
                                    </div>
                                )
                            }
                        </Button>
                    </Stack>
            )}
        </Center>
    </Stack>
</Center>
            </ContentWrapper>
        </>
    )
}
