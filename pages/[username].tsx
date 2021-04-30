import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Center,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stack,
    Avatar,
    Button,
    Text,
    Container,
} from '@chakra-ui/react';

import { ContentWrapper } from '../components/ContentWrapper';

import { useDefaultSkyDB } from '../lib/useSkyDB';
import useUser from '../lib/useUser';

/**
 * `collections` is an array of objects of the following shape:
 *      {
 *         contractAddress: <string>
 *         title: <string>,
 *         symbol: <string>,
 *
 *         {
 *              name: <string>,
 *              description: <string>,
 *              image: <string> (this is the `src` string for the image)
 *         }
 *      }
 *
 * Each object (collection) in the `collections` array contains the collection's address, title, symbol, and the tokens in it.
 * The tokens are represented as objects containing the token name, description, and image URI.
 */

const CollectionRow = ({ collection }: any): JSX.Element => {
    const { collectionBanner, title, symbol, creatorUsername } = collection;
    return (
        <Container className="flex justify-start items-center border-b-2 border-gray-200 py-4">
            <Container className="mr-4 rounded-full overflow-hidden">
                <Avatar src={collectionBanner} name={title} />
            </Container>

            <Container className="flex flex-col justify-center w-48">
                <Text className="text-lg text-gray-800 font-normal"> {title} </Text>
                <Text className="text-md text-gray-800 font-light">
                    {`$${symbol} by ${creatorUsername}`}
                </Text>
            </Container>
        </Container>
    );
};

CollectionRow.displayName = 'CollectionRow';

export default function Dashboard(): JSX.Element {
    const [collections, setCollections] = useState<any[]>([]);

    const { getAllCollections } = useDefaultSkyDB();
    const { user } = useUser();

    const router = useRouter();
    const { username } = router.query;

    useEffect(() => {
        const getCollectionsfromDB = async () => {
            const collectionsFromDB = await getAllCollections(user.publicAddress);
            const collectionData = Object.keys(collectionsFromDB).map((key) => {
                return { contractAddress: key, ...collectionsFromDB[key] };
            });
            setCollections([...collectionData]);
        };
        getCollectionsfromDB();
    }, [user, getAllCollections]);

    return (
        <>
            <ContentWrapper>
                <Container className="mt-8 mb-4">
                    <Container className="flex justify-between px-4 items-center">
                        <Text className="text-gray-800 text-4xl font-black">Collections</Text>

                        <HamburgerIcon h={8} w={8} color="gray.600" />
                    </Container>
                </Container>

                <Container className="border border-black mb-16" style={{ height: '480px' }}>
                    <Center>
                        <Tabs>
                            <TabList>
                                <Tab>Your collections</Tab>
                                <Tab isDisabled>Bookmarked</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Center>
                                        <Stack>
                                            {collections.length > 0 ? (
                                                collections.map((col) => {
                                                    return (
                                                        <Link
                                                            href={`/${username}/${col.title}`}
                                                            key={col.title}
                                                        >
                                                            <CollectionRow collection={col} />
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <Text className="text-lg text-gray-800 font-light">
                                                    No collections created yet!
                                                </Text>
                                            )}
                                        </Stack>
                                    </Center>
                                </TabPanel>

                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Center>
                </Container>

                <Center>
                    <Link href={`/${username}/untitled`}>
                        <Button
                            px="16"
                            className="border-2 border-black bg-white shadow-md rounded-lg h-10"
                        >
                            Create a collection
                        </Button>
                    </Link>
                </Center>
            </ContentWrapper>
        </>
    );
}

Dashboard.displayName = 'Dashboard';
