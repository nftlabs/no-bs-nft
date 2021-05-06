import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import registryArtifact from '../../artifacts/contracts/OpenApeRegistry.sol/OpenApeRegistry.json';
import { MagicMaticClient } from '../magic';
import createCollection, { getCreate2Address } from '../createCollection';

import useUser from '../useUser';
import { useDefaultSkyDB } from '../useSkyDB';

interface TransactionParams {
    gasLimit: number;
    gasPrice: ethers.BigNumber;
}

interface NFTDraft {
    name: string;
    description: string;
    image: string;
    amount: number;
    metadataLink: string;
}

const openapeRegistryAddr = '';
const openapeRegistryABI = registryArtifact.abi;

const txParams: TransactionParams = {
    gasLimit: 5 * (10**6),
    gasPrice: ethers.utils.parseUnits('10', 'gwei'),
};

export default function useCollection() {

    const [registryContract, setRegistryContract] = useState<any>('');
    const [signer, setSigner] = useState<any>('');

    const { user } = useUser();
    const { saveNewCollection } = useDefaultSkyDB();

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(MagicMaticClient.rpcProvider as any);
        const magicSigner = provider.getSigner();
        const magicContract = new ethers.Contract(openapeRegistryAddr, openapeRegistryABI, magicSigner);

        setSigner(magicSigner);
        setRegistryContract(magicContract);
    }, [user])

    const createNewCollection = async (
        title: string,
        symbol: string,
        nftObjects: NFTDraft[],
    ) => {

        const nftsToUpload = nftObjects.map((nft: NFTDraft) => {
            return {
                metadataLink: nft.metadataLink,
                amount: nft.amount,
            };
        });

        const contractAddress = await createCollection(
            registryContract,
            signer,

            title,
            symbol,
            user.email,
            nftsToUpload,

            txParams,
        );

        await saveNewCollection(
            user.publicAddress,
            contractAddress,
            title,
            symbol,
            nftObjects
        )

        return contractAddress;
    }

    const predictCollectionAddress = async (
        email: string,
        title: string,
        symbol: string,
    ) => {
        return getCreate2Address(
            email,
            title,
            symbol,
        );
    }

    return {
        createNewCollection
    }
}