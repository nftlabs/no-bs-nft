import React, { useEffect, useState, useContext, useRef } from 'react';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';

import useUser from '../../../lib/useUser';
import useGasPrice from '../../../lib/useGasPrice';
import { useDefaultSkyDB } from '../../../lib/useSkyDB';
import createCollection from '../../../lib/createCollection';
import { uploadMediaToSkynet, uploadMetadataToSkynet } from '../../../lib/skynet';
import { ContractContext } from '../../../lib/ContractContext';

import { ContentWrapper } from '../../../components/ContentWrapper';
import { Button } from '@chakra-ui/button';

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

interface TransactionParams {
    gasLimit: number;
    txNonce: number;
    gasPrice: ethers.BigNumber;
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

    const { user } = useUser();
    const { updateUserNFTDrafts } = useDefaultSkyDB();

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
        await updateUserNFTDrafts(user.publicAddress, collectionTitle, [nftToSave]);
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
    const [NFT, BidExecutor] = useContext(ContractContext);

    const [title, setTitle] = useState<string>(collectionProperties.title);
    const [symbol, setSymbol] = useState<string>(collectionProperties.symbol);

    const context = useWeb3React<Web3Provider>();
    const { library, chainId } = context;

    const { user } = useUser();

    const { gasPrice, gasEstimates } = useGasPrice((chainId as number) || 1);
    const { updateUserNFTs } = useDefaultSkyDB();

    const handleCreateCollection = async () => {
        const signer = library.getSigner(user.publicAddress);
        const txNonce_magic = parseInt((await signer.getTransactionCount()).toString());
        const gasPriceInGwei = ethers.utils.parseUnits(gasPrice, 'gwei');
        const gasLimit = gasEstimates.uploadTransaction;

        const txParams: TransactionParams = {
            gasLimit,
            txNonce: txNonce_magic,
            gasPrice: gasPriceInGwei,
        };

        const nftsToUpload: NFTToUpload[] = NFTs.map((nft: NFTData) => {
            return {
                metadataLink: nft.metadata.metadataLink,
                amount: nft.amount,
            };
        });

        const contractAddress = await createCollection(
            NFT,
            BidExecutor,

            title,
            symbol,

            nftsToUpload,

            signer,
            chainId,
            txParams,

            user.email,
            user.publicAddress,
        );
        // save NFT metadata + other info to skydb
        await updateUserNFTs(user.publicAddress, contractAddress, NFTs);
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

export default function Collection(): JSX.Element {
    const [createNFTView, setCreateNFTView] = useState<boolean>(false);
    const [NFTs, setNFTs] = useState<(NFTData | NFTDraft)[]>([]);

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

    const saveNFTAsDraft = async (nftObject: NFTDraft) => {
        // skydb call to update saved drafts
        setNFTs([...NFTs, nftObject]);
    };

    return createNFTView ? (
        <CreateNFTView
            draft={isDraft.current}
            saveNFT={saveNFTAsDraft}
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

Collection.displayName = 'Collection';
