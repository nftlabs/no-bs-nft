import React, { useEffect, useState, useRef } from 'react';
import { GetStaticProps } from 'next';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useRouter } from 'next/router';
import useUser from '../../lib/useUser';
import useGasPrice from '../../lib/useGasPrice';
import { useDefaultSkyDB } from '../../lib/useSkyDB';
import { compileERC721 } from '../../lib/compile';
import createCollection from '../../lib/createCollection';
import { ContentWrapper } from '../../components/ContentWrapper';
import { Button } from '@chakra-ui/button';

export const getStaticProps: GetStaticProps = async (context) => {
    const { NFT, BidExecutor } = await compileERC721();

    return {
        props: {
            NFT,
            BidExecutor,
        },
    };
};

interface NFTData {
    name: string;
    description: string;
    image: string;
    metadataLink: string;
    amount: number;
}

interface TransactionParams {
    gasLimit: number;
    txNonce: number;
    gasPrice: ethers.BigNumber;
}

export default function Collection({ NFT, BidExecutor }): JSX.Element {
    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [NFTs, setNFTs] = useState<NFTData[]>([]);

    const context = useWeb3React<Web3Provider>();
    const { library, chainId } = context;

    const router = useRouter();
    const { user } = useUser();
    const collectionName = router.query;

    const { gasPrice, gasEstimates } = useGasPrice((chainId as number) || 1);
    const { getCollectionByCollectionTitle } = useDefaultSkyDB();

    // Since the collection page is a 'save draft' type editable doc.
    useEffect(() => {
        const getNFTsFromDB = async () => {
            const collection = await getCollectionByCollectionTitle(
                user.publicAddress,
                collectionName,
            );
            if (collection.title) {
                delete collection.title;
            }

            if (collection.symbol) {
                delete collection.symbol;
            }

            const nftsInCollection = Object.keys(collection).map((URI) => {
                return collection[URI];
            });

            setNFTs([...nftsInCollection]);
        };

        getNFTsFromDB();
    }, [user, getCollectionByCollectionTitle, collectionName]);

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

        await createCollection(
            NFT,
            BidExecutor,

            name,
            symbol,

            NFTs,

            signer,
            chainId,
            txParams,

            user.email,
            user.publicAddress,
        );
    };

    return (
        <>
            <ContentWrapper>
                <Button onClick={handleCreateCollection}>Create collection</Button>
            </ContentWrapper>
        </>
    );
}

Collection.displayName = 'Collection';
