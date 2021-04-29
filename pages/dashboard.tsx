import React, { useEffect, useState } from 'react';
import { ContentWrapper } from '../components/ContentWrapper';
import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';

import { LoggedInHeader } from '../components/LoggedInHeader';

const DashboardMain: React.FC<any> = () => {
    return <Box>Main</Box>;
};
DashboardMain.displayName = 'DashboardMain';

export default function Dashboard(): JSX.Element {
    return (
        <ContentWrapper height="100%">
            <Stack>
                <LoggedInHeader />
                <DashboardMain />
            </Stack>
        </ContentWrapper>
    );
}

Dashboard.displayName = 'Dashboard';
