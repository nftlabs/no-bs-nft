import React, { useState, useCallback } from 'react';

import { Button, Stack, Center, Input, Textarea, Flex, useDisclosure } from '@chakra-ui/react';

import { useDropzone } from 'react-dropzone';

import { ContentWrapper } from 'components/ContentWrapper';

export default function Create({ setView }: any): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {}, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ContentWrapper>
                <div className="flex flex-col mt-8 mb-32 lg:flex-row lg:justify-center lg:items-start lg:mt-16 lg:mb-0">
                    <div className="lg:mx-4">
                        <Center>
                            <Flex
                                height="300px"
                                width="320px"
                                bg="transparent"
                                borderRadius="12px"
                                border="2px dashed #333"
                                align="center"
                                justify="center"
                                direction="column"
                            >
                                <Flex {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Button
                                        color="#444"
                                        borderRadius="25px"
                                        mt="8px"
                                        boxShadow="none !important"
                                    >
                                        {files.length > 0
                                            ? 'Add one or more files'
                                            : 'Choose one or more files'}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Center>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:mx-4">
                        <Center>
                            <Stack px="4" spacing="4" width="400px">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="collection-name"
                                        className="text-lg text-gray-800 font-semibold mb-2"
                                    >
                                        Name
                                    </label>
                                    <Input id="collection-name" placeholder="E.g. 'Zombie Punk'" />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="collection-name"
                                        className="text-lg text-gray-800 font-semibold my-2"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        id="collection-symbol"
                                        placeholder="E.g. Dylan Field sold the zombie punk for millions."
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="token-amount"
                                        className="text-lg text-gray-800 font-semibold my-2"
                                    >
                                        Amount
                                    </label>
                                    <Input id="token-amount" placeholder="E.g. 1 (by default)" />
                                </div>

                                <button className="border-2 border-black bg-white shadow-md rounded-lg h-10">
                                    Create NFT
                                </button>
                            </Stack>
                        </Center>
                    </div>
                </div>
            </ContentWrapper>
        </>
    );
}

