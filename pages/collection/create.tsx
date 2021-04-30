import React, { useState } from 'react';
import { Box, Button, Input, InputGroup, InputLeftAddon, Stack, Text } from '@chakra-ui/react';
import { LoggedInHeader } from '../../components/LoggedInHeader';
import { ContentWrapper } from '../../components/ContentWrapper';

export default function CreateCollection(): JSX.Element {
    const [nameValue, setNameValue] = useState('');
    const [symbolValue, setSymbolValue] = useState('');

    return (
        <ContentWrapper>
            <LoggedInHeader />
            <Stack spacing={4}>
                <Text fontSize="xl">Create Collection</Text>
                <Input
                    value={nameValue}
                    placeholder="Collection Name"
                    onChange={(event) => setNameValue(event.target.value)}
                    width="360px"
                />
                <InputGroup>
                    <InputLeftAddon children="$" />
                    <Input placeholder="SYMBOL" width={24} />
                </InputGroup>
                <Button
                    width={24}
                    backgroundColor="purple"
                    color="white"
                    onClick={() => {
                        console.log('create');
                    }}
                >
                    Create
                </Button>
            </Stack>
        </ContentWrapper>
    );
}
