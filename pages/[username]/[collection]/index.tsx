import React, { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/router';

import useUser from '../../../lib/useUser';
import useSkynet from '../../../lib/hooks/useSkynet';
import useNFT from '../../../lib/hooks/useNFT';

import { ContentWrapper } from '../../../components/ContentWrapper';
import { Button } from '@chakra-ui/button';
import useCollection from '../../../lib/hooks/useCollection';

interface NFT {
    name: string;
    description: string;
    image: string;
    amount: number;
    metadataLink: string;
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

    const { storeNFTMetadata } = useNFT();

    // If the collection is a draft (i.e. the collection / NFT contract has not been deployed)
    const handleNFTDraft = async () => {
        
        const { imageURI, metadataLink } = await storeNFTMetadata(name, description, file);

        const nftToSave: NFT = {
            name,
            description,
            image: imageURI,
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
    const [NFTs, setNFTs] = useState<(NFT)[]>([]);

    const collectionProperties = useRef<CollectionProperties>({
        title: 'untitled',
        symbol: 'untitled',
    });

    const isDraft = useRef<boolean>(false);

    const { getNFTsInCollection, saveCollection } = useCollection(); 
    
    const { user } = useUser();
    const router = useRouter();
    const { collectionName } = router.query;

    // Since the collection page is a 'save draft' type editable doc.
    useEffect(() => {
        // get NFTs from Db
        async function getNFTsFromDb() {
            const NFTsInCollection = await getNFTsInCollection(user.publicAddress, collectionName as string);
            setNFTs(NFTsInCollection);
        }

        getNFTsFromDb();
    }, [collectionName, user]);

    const saveCollectionAsDraft = async (title: string, symbol: string) => {
        await saveCollection(user.email, title, symbol, NFTs);
    };

    const saveNFTInDraft = async (nftObject: NFT) => {
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
