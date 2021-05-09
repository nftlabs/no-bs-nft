import React, { useEffect, useState } from 'react';
import { ContentWrapper } from '../components/ContentWrapper';
import { Box, Button, Center, Flex, HStack, Spinner, Stack, Text } from '@chakra-ui/react';

import { LoggedInHeader } from '../components/LoggedInHeader';
import { useRouter } from 'next/router';
import useUser from '../lib/useUser';
import useCollection from '../lib/hooks/useCollection';

const DashboardCollectionList: React.FC<any> = () => {
  const collectionList = [];
  return (
    <Box>
      {collectionList.map((collection) => (
        <Text key={collection.id}>{collection.name}</Text>
      ))}
    </Box>
  );
};

DashboardCollectionList.displayName = 'DashboardCollectionList';

const DashboardMain: React.FC<any> = () => {
  const [collections, setCollections] = useState<any>([]);
  const { user } = useUser();
  const { getCollections } = useCollection();

  useEffect(() => {
    if (!collections) {
      const c = getCollections(user.publicAddress);
      console.log('getCollections', c);
      setCollections(c);
    }
  }, [getCollections, collections, setCollections, user]);

  const router = useRouter();
  return (
    <Box>
      <Flex flexDir="row" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" flexGrow={1}>
          Your Collections
        </Text>
        <Button
          onClick={() => {
            router.push('/collection/create');
          }}
        >
          + Collection
        </Button>
      </Flex>
    </Box>
  );
};
DashboardMain.displayName = 'DashboardMain';

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, router, loading]);

  if (!user) {
    return (
      <Center width="100vw" height="100vh">
        <Spinner />
      </Center>
    );
  }

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
