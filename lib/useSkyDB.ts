import { useEffect, useRef } from 'react';
import ethereum_address from 'ethereum-address';
import { genKeyPairFromSeed, SkynetClient } from 'skynet-js';

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    metadataLink: string;
}

interface NFTData {
    metadata: NFTMetadata;
    amount: number;
}

interface NFTDraft {
    name: string;
    description: string;
    image: string;
    amount: number;
}

// SkyDB document shape -- https://www.notion.so/fdotinc/OpenApe-ce6504e20ca14d38bdb1d879bc33830b#7ee0a3d6f8d54b479d644fd55d65fe16

// Hook with default skyDB settings
export function useDefaultSkyDB(): any {
    return useSkyDB('Open Ape datastore', process.env.NEXT_PUBLIC_SKYDB_SEED || '');
}

export default function useSkyDB(dataKey: string, seed: string): any {
    // ===== SKYLINK / SKYNET =====
    const skyPortalRef = useRef<any>();
    const skydbPrivateKey = useRef<any>();
    const skydbPublicKey = useRef<any>();

    // Initialize skyDB client
    useEffect(() => {
        const portal = 'https://siasky.net/';
        skyPortalRef.current = new SkynetClient(portal);

        const { privateKey, publicKey } = genKeyPairFromSeed(seed);

        skydbPrivateKey.current = privateKey;
        skydbPublicKey.current = publicKey;
    }, [seed]);

    // CAUTION: Function to directly upload JSON to skyDB, DOES NOT CHECK validity
    const uploadToSkyDB = async (document: Record<string, any>) => {
        try {
            await skyPortalRef.current.db.setJSON(skydbPrivateKey.current, dataKey, document);

            // console.log("Uploading to SkyDB: ", document);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to get all data from skyDB as JSON (not exported)
    const getDataFromSkyDB = async () => {
        // console.log("Calling getDataFromSkyDB")
        try {
            const { data, revision } = await skyPortalRef.current.db.getJSON(
                skydbPublicKey.current,
                dataKey,
            );

            // console.log("Data from SkyDB: ", data);
            // console.log("Revisions to SkyDB: ", revision);

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // Return the JSON data pertaining to a specific user
    const getUser = async (publicAddress: string) => {
        const data = await getDataFromSkyDB();

        if (Object.keys(data).includes(publicAddress)) {
            return data[publicAddress];
        } else {
            // console.log(
            //   "Error: there is no user with that public address in the database"
            // );
            return null;
        }
    };

    const getUserByUsername = async (username: string) => {
        const data = await getDataFromSkyDB();

        // Get all addresses with given username
        const publicAddresses = Object.keys(data).filter((key) => data[key].username === username);

        if (publicAddresses.length) {
            const publicAddress = publicAddresses[0];
            // Return user data and public address
            return {
                ...data[publicAddress],
                publicAddress,
            };
        } else {
            // console.log("Error: there is no user with that username in the database");
        }
    };

    // Onboard a user to the database
    // Visit the link at the top of the file for the SkyDB document shape.
    const onboardUser = async (publicAddress: string) => {
        const data = await getDataFromSkyDB();

        // If the public address isn't already in the database, onboard them
        if (!data || !data[publicAddress]) {
            const document = {
                ...data,
                [publicAddress]: {
                    username: '',
                    transactions: [],

                    collections: {
                        drafts: {},
                        deployed: {},
                    },
                },
            };

            await uploadToSkyDB(document);
        } else {
            // console.log("Error: that public address is already in the database");
        }
    };

    const saveCollectionDraft = async (
        publicAddress: string,
        title: string,
        symbol: string,
        nftObjects: NFTDraft[],
    ) => {
        const data = await getDataFromSkyDB();
        const document = data ? { ...data } : {};

        if (!document[publicAddress]) {
            await onboardUser(publicAddress);
        }

        let draftToUpload = {
            title,
            symbol,
            NFTs: nftObjects,
        };

        if (Object.keys(document[publicAddress].collections.drafts).includes(title)) {
            const nftsInDrafts = document[publicAddress].collections.drafts[title].NFTs;

            draftToUpload = { ...draftToUpload, NFTs: [...nftsInDrafts, ...draftToUpload.NFTs] };
        }

        document[publicAddress].collections.drafts[title] = draftToUpload;
        await uploadToSkyDB(document);
    };

    const getAddressByCollectionTitle = async (publicAddress: string, collectionTitle: string) => {
        const data = await getDataFromSkyDB();
        const document = data;

        const deployedCollections = document[publicAddress].collections.deployed;
        const collectionAddresses = Object.keys(deployedCollections);

        const targetCollectionAddress = collectionAddresses.filter((contractAddress) => {
            return deployedCollections[contractAddress].title === collectionTitle;
        });

        if (targetCollectionAddress.length) {
            const address = targetCollectionAddress[0];
            return address;
        } else {
            console.error(`The user has no collection titled ${collectionTitle}`);
            return '';
        }
    };

    // Visit the link at the top of the file for the SkyDB document shape.
    const getDeployedCollection = async (publicAddress: string, collectionTitle: string) => {
        const data = await getDataFromSkyDB();
        const contractAddress = await getAddressByCollectionTitle(publicAddress, collectionTitle);

        if (!contractAddress) {
            console.error(`There is no collection in the db titled ${collectionTitle}`);
            return null;
        }

        if (data && data[publicAddress]) {
            return data[publicAddress].collections.deployed[contractAddress];
        } else {
            return null;
        }
    };

    // Visit the link at the top of the file for the SkyDB document shape.
    const getDraftCollection = async (publicAddress: string, collectionTitle: string) => {
        const data = await getDataFromSkyDB();

        if (data && data[publicAddress]) {
            const isDraft = Object.keys(data[publicAddress].collections.drafts).includes(
                collectionTitle,
            );

            if (isDraft) {
                return data[publicAddress].collections.deployed[collectionTitle];
            } else {
                console.error(`There is no collection in the db titled ${collectionTitle}`);
                return null;
            }
        } else {
            return null;
        }
    };

    const updateUserNFTDrafts = async (
        publicAddress: string,
        collectionIdentifier: string,
        nftObjects: NFTData[],
    ) => {
        const data = await getDataFromSkyDB();
        const document = data ? { ...data } : {};
        let drafts = {};

        if (!document[publicAddress]) {
            document[publicAddress] = { collections: {} };
        }

        if (ethereum_address.isAddress(collectionIdentifier)) {
            const contractAddress = collectionIdentifier;

            if (!document[publicAddress].collections[contractAddress]) {
                document[publicAddress].collections[contractAddress] = {};
            }

            if (!document[publicAddress].collections[contractAddress].drafts) {
                document[publicAddress].collections[contractAddress].drafts = {};
            } else {
                drafts = { ...document[publicAddress].collections[contractAddress].drafts };
            }

            nftObjects.forEach((nftObj) => {
                const nftIdentifier: string = nftObj.metadata.image;
                document[publicAddress].collections[contractAddress].drafts[nftIdentifier] = nftObj;
            });
        } else {
            const collectionName = collectionIdentifier;

            if (!document[publicAddress].collections.drafts[collectionName]) {
                document[publicAddress].collections.drafts[collectionName] = {};
            }

            nftObjects.forEach((nftObj) => {
                const nftIdentifier: string = nftObj.metadata.image;
                document[publicAddress].collections.drafts[collectionName][nftIdentifier] = nftObj;
            });
        }

        await uploadToSkyDB(document);
    };

    // Visit the link at the top of the file for the SkyDB document shape.
    const updateUserNFTs = async (
        publicAddress: string,
        contractAddress: string,
        nftObjects: NFTData[],
    ) => {
        const data = await getDataFromSkyDB();
        const document = data ? { ...data } : {};

        if (!document[publicAddress]) {
            document[publicAddress] = { collections: {} };
        }
        if (!document[publicAddress].collections[contractAddress]) {
            document[publicAddress].collections[contractAddress] = {};
        }

        nftObjects.forEach((nftObj) => {
            const nftIdentifier: string = nftObj.metadata.image;
            document[publicAddress].collections[contractAddress][nftIdentifier] = nftObj;
        });

        await uploadToSkyDB(document);
    };

    // Visit the link at the top of the file for the SkyDB document shape.
    const getAllCollections = async (publicAddress: string) => {
        const data = await getDataFromSkyDB();
        if (data && data[publicAddress]) {
            return data[publicAddress].collections;
        } else {
            return null;
        }
    };

    // Update a users fields in DB
    const updateUser = async (publicAddress: string, updates: Record<string, any>) => {
        const data = await getDataFromSkyDB();

        // If the public address is already in the database, update it
        if (data && data[publicAddress]) {
            const document = {
                ...data,
                [publicAddress]: {
                    ...data[publicAddress],
                    ...updates,
                },
            };

            await uploadToSkyDB(document);
        } else {
            // console.log("Error: that public addess is not in the database");
        }
    };

    // Add transaction log to DB
    const logTransaction = async (publicAddress: string, hash: any) => {
        const data = await getDataFromSkyDB();

        if (data && data[publicAddress]) {
            const field = data[publicAddress].transactions;
            const logs = field && field.length ? field : [];

            const document = {
                ...data,
                [publicAddress]: {
                    ...data[publicAddress],
                    transactions: logs.includes(hash) ? [...logs] : [...logs, hash],
                },
            };

            await uploadToSkyDB(document);
        } else {
            // console.log("Error: that public address is not in the database");
        }
    };

    // Add transaction log to DB
    const logContractAddress = async (publicAddress: string, contractAddress: any) => {
        const data = await getDataFromSkyDB();

        if (data !== undefined && data[publicAddress] !== undefined) {
            const field = data[publicAddress].NFTs;
            const logs = field && field.length ? field : [];

            const document = {
                ...data,
                [publicAddress]: {
                    ...data[publicAddress],
                    NFTs: [...logs, contractAddress],
                },
            };

            // console.log("New document: ", document)

            await uploadToSkyDB(document);
        } else {
            // console.log("Error: that public address is not in the database");
        }
    };

    return {
        getDataFromSkyDB,
        getUser,
        getUserByUsername,
        onboardUser,
        updateUser,
        logTransaction,
        logContractAddress,
        updateUserNFTs,
        getAllCollections,
        updateUserNFTDrafts,
        saveCollectionDraft,
        getDeployedCollection,
        getDraftCollection,
    };
}
