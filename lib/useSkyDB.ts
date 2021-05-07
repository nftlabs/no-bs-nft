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

          collections: {}
        },
      };

      await uploadToSkyDB(document);
    } else {
      // console.log("Error: that public address is already in the database");
    }
  };

  const saveNewCollection = async (
    publicAddress: string,
    contractAddress: string,
    title: string,
    symbol: string,
    nftObjects: NFTDraft[],
  ) => {
    const data = await getDataFromSkyDB();
    const document = data;

    if(Object.keys(document).includes(publicAddress)) {
        let draftToUpload = {
            title,
            symbol,
            NFTs: nftObjects,
        };

        document[publicAddress].collections[contractAddress] = draftToUpload;
    }
    
    await uploadToSkyDB(document);
  };

  const saveNFTsToCollection = async (
    publicAddress: string,
    contractAddress: string,
    nftObjects: NFTDraft[],
  ) => {
    const data = await getDataFromSkyDB();
    const document = data;

    if(Object.keys(document).includes(publicAddress)) {
        const collection = document[publicAddress].collections[contractAddress];
        let nftsToSave = collection.NFTs.length ? [...collection.NFTs, ...nftObjects] : nftObjects;

        document[publicAddress].collections[contractAddress].NFTs = nftsToSave;
    }
    
    await uploadToSkyDB(document);
  };

  const deleteNFTFromCollectionDraft = async (
    publicAddress: string,
    contractAddress: string,
    metadataLink: string,
  ) => {

    const data = await getDataFromSkyDB();
    const document = data;

    if(Object.keys(document).includes(publicAddress)) {
        const collectionNFTs = document[publicAddress].collections[contractAddress].NFTs;
        const newCollectionNFTs = collectionNFTs.filter((nftObject) => nftObject.metadataLink !== metadataLink);

        document[publicAddress].collections[contractAddress].NFTs = newCollectionNFTs;
    }

    await uploadToSkyDB(document);
  }

  const addNFTToCollection = async (
    publicAddress: string,
    contractAddress: string,
    nftObject: NFTMetadata,
  ) => {

    const data = await getDataFromSkyDB();
    const document = data;

    if(Object.keys(document).includes(publicAddress)) {
        const collectionNFTs = document[publicAddress].collections[contractAddress].NFTs;
        collectionNFTs.push(nftObject);

        document[publicAddress].collections[contractAddress].NFTs = collectionNFTs;
    }

    await uploadToSkyDB(document);
  }

  const updateCollectionProperties = async (
    publicAddress: string,
    contractAddress: string,
    title: string,
    symbol: string,
  ) => {
    const data = await getDataFromSkyDB();
    const document = data;

    if(Object.keys(document).includes(publicAddress)) {

        document[publicAddress].collections[contractAddress].title = title;
        document[publicAddress].collections[contractAddress].symbol = symbol;
    }
    
    await uploadToSkyDB(document);
  };

  const getAddressByCollectionTitle = async (publicAddress: string, collectionTitle: string) => {
    const data = await getDataFromSkyDB();
    const document = data;

    const collections = document[publicAddress].collections;
    const collectionAddresses = Object.keys(collections);

    const targetCollectionAddress = collectionAddresses.filter((contractAddress) => {
      return collections[contractAddress].title === collectionTitle;
    });

    if (targetCollectionAddress.length) {
      const address = targetCollectionAddress[0];
      return address;
    } else {
      console.error(`The user has no collection titled ${collectionTitle}`);
    }
  };

  // Visit the link at the top of the file for the SkyDB document shape.
  const getAllCollections = async (publicAddress: string) => {
    const data = await getDataFromSkyDB();
    if (Object.keys(data).includes(publicAddress)) {
      return data[publicAddress].collections;
    } else {
      return null;
    }
  };

  // Visit the link at the top of the file for the SkyDB document shape.
  const getCollection = async (publicAddress: string, contractAddress: string) => {
    const data = await getDataFromSkyDB();
    if (Object.keys(data).includes(publicAddress)) {
      return data[publicAddress].collections[contractAddress];
    } else {
      return null;
    }
  };

  // Visit the link at the top of the file for the SkyDB document shape.
  const getNFTsOfCollection = async (publicAddress: string, contractAddress: string) => {
    const data = await getDataFromSkyDB();
    if (Object.keys(data).includes(publicAddress)) {
      return data[publicAddress].collections[contractAddress].NFTs;
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

  return {
    getDataFromSkyDB,
    getUser,
    getUserByUsername,
    onboardUser,
    updateUser,
    getAllCollections,
    saveNewCollection,
    saveNFTsToCollection,
    deleteNFTFromCollectionDraft,
    addNFTToCollection,
    updateCollectionProperties,
    getAddressByCollectionTitle,
    getNFTsOfCollection
  };
}
