import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import useUser from '../lib/useUser';

export const LoggedInHeader: React.FC<any> = () => {
    const { logout } = useUser();
    return (
        <Flex flexDir="row" width="100%" justifyContent="flex-end" alignItems="flex-end" p={4}>
            <Button
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </Button>
        </Flex>
    );
};
LoggedInHeader.displayName = 'LoggedInHeader';
