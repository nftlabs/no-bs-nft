import React, { useEffect, useState, useContext, useRef } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { MagicMaticClient } from '../../../lib/magic';

import useUser from '../../../lib/useUser';
import { useDefaultSkyDB } from '../../../lib/useSkyDB';
import createCollection from '../../../lib/createCollection';
import { uploadMediaToSkynet, uploadMetadataToSkynet } from '../../../lib/skynet';

import { ContentWrapper } from '../../../components/ContentWrapper';
import { Button } from '@chakra-ui/button';
import useCollection from '../../../lib/hooks/useCollection';

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
    metadataLink: string;
}

interface NFTToUpload {
    metadataLink: string;
    amount: number;
}


// If draft == true, then collectionIdentifier is the collection title.
// If draft == false, then the collectionIdentifier is the collection's (i.e. the NFT contract's) address
interface CreateNFTViewProps {
    draft: boolean;
    saveNFT: any;
    collectionTitle: string;
}

interface CollectionProperties {
    title: string;
    symbol: string;
}

function CreateNFTView({ draft, saveNFT, collectionTitle }: CreateNFTViewProps): JSX.Element {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);
    const [file, setFile] = useState<File | null>(null);

    // If the collection is a draft (i.e. the collection / NFT contract has not been deployed)
    const handleNFTDraft = async () => {
        // state variable `file: File[]` uploaded by user
        const imageURI = await uploadMediaToSkynet(file);

        const metadataToUpload = {
            name,
            description,
            image: imageURI,
        };

        const metadataLink: string = await uploadMetadataToSkynet(metadataToUpload);

        const nftToSave: NFTDraft = {
            ...metadataToUpload,
            metadataLink,
            amount,
        };

        saveNFT(nftToSave);
    };

    // If the collection is not a draft (i.e. the collection / NFT contract has been deployed)
    const handleUploadToCollection = async () => {
        // Upload NFT to collection contract.
    };

    return (
        <>
            <ContentWrapper>
                <Button onClick={draft ? handleNFTDraft : handleUploadToCollection}>
                    Create NFT
                </Button>
            </ContentWrapper>
        </>
    );
}

function CollectionView({
    changeToNFTView,
    NFTs,
    collectionProperties,
    saveCollectionDraft,
}: any): JSX.Element {

    const [title, setTitle] = useState<string>(collectionProperties.title);
    const [symbol, setSymbol] = useState<string>(collectionProperties.symbol);

    const { createNewCollection } = useCollection();

    const handleCreateCollection = async () => {

        const contractAddress = await createNewCollection(
            title,
            symbol,
            NFTs,
        );
    };

    return (
        <>
            <ContentWrapper>
                <Button onClick={changeToNFTView}>Add an NFT to collection</Button>
                <Button onClick={handleCreateCollection}>Create collection</Button>
                <Button onClick={() => saveCollectionDraft(title, symbol)}>
                    Save draft instead
                </Button>
            </ContentWrapper>
        </>
    );
}

export default function CollectionPage(): JSX.Element {
    const [createNFTView, setCreateNFTView] = useState<boolean>(false);
    const [NFTs, setNFTs] = useState<(NFTDraft)[]>([]);

    const collectionProperties = useRef<CollectionProperties>({
        title: 'untitled',
        symbol: 'untitled',
    });
    const isDraft = useRef<boolean>(false);

    const { saveCollectionDraft, getDeployedCollection, getDraftCollection } = useDefaultSkyDB();
    const { user } = useUser();
    const router = useRouter();
    const collectionName = router.query;

    // Since the collection page is a 'save draft' type editable doc.
    useEffect(() => {
        // get NFTs from Db
        async function getNFTsFromDb() {
            let collection = await getDeployedCollection(user.publicAddress, collectionName);

            if (!collection) {
                collection = await getDraftCollection(user.publicAddress, collectionName);
                isDraft.current = true;
            }
            if (collection) {
                setNFTs([...collection.NFTs]);
                collectionProperties.current = {
                    title: collection.title,
                    symbol: collection.symbol,
                };
            }
        }

        getNFTsFromDb();
    }, [collectionName, getDeployedCollection, getDraftCollection, user]);

    const saveCollectionAsDraft = async (title: string, symbol: string) => {
        await saveCollectionDraft(title, symbol, NFTs);
    };

    const saveNFTInDraft = async (nftObject: NFTDraft) => {
        setNFTs([...NFTs, nftObject]);
    };

    return createNFTView ? (
        <CreateNFTView
            draft={isDraft.current}
            saveNFT={saveNFTInDraft}
            collectionTitle={collectionProperties.current.title}
        />
    ) : (
        <CollectionView
            changeToNFTView={() => setCreateNFTView(true)}
            NFTs={NFTs}
            saveCollectionDraft={saveCollectionAsDraft}
            collectionProperties={collectionProperties.current}
        />
    );
}

CollectionPage.displayName = 'CollectionPage';
