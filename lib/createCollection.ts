import { ethers } from 'ethers';

import { uploadWithoutWait, uploadAndWaitForMine } from './upload';
import { saltToHex, buildBytecode, buildCreate2Address } from './deployWithCreate2';

import bidExecutorArtifact from '../artifacts/contracts/BidExecutor.sol/BidExecutor.json';
import nftArtifact from '../artifacts/contracts/NFT.sol/NFT.json';

interface NFT {
    metadataLink: string;
    amount: number;
}

interface TransactionParams {
    gasLimit: number;
    gasPrice: ethers.BigNumber;
}

const bidExecutorAddress = '';

export function getCreate2Address(
    salt: string | number,
    name: string,
    symbol: string,
) {
    const contractBytecode = nftArtifact.bytecode;
    const constructorTypes = ['string', 'string', 'address'];
    const constructorArgs = [name, symbol, bidExecutorAddress]

    return buildCreate2Address(
        saltToHex(salt),
        buildBytecode(constructorTypes, constructorArgs, contractBytecode),
    );
}

// / Points the helper auction contract to the NFT contract.
export const setNFTFactory = async (
    nftAddress: string,
    signer: any,
) => {

    const { abi } = bidExecutorArtifact;
    try {
        const bidExecutor = new ethers.Contract(bidExecutorAddress, abi, signer);

        const bidExecutorTx = await bidExecutor.connect(signer).setNftFactory(nftAddress);
        await bidExecutorTx.wait();

        return {
            tx: bidExecutorTx,
        };
    } catch (err) {
        console.log(err);
    }
};

export const deployNFTContract = async (
    contract: any,

    name: string,
    symbol: string,
    salt: string | number,
) => {
    
    let nftAddress: string;
    const contractBytecode = nftArtifact.bytecode;
    const constructorTypes = ['string', 'string', 'address'];
    const constructorArgs = [name, symbol, bidExecutorAddress]

    try {
        const saltHex = saltToHex(salt)

        const bytecode = buildBytecode(
            constructorTypes,
            constructorArgs,
            contractBytecode,
        )
        const tx = await contract.deployNFT(bytecode, saltHex)
        await tx.wait()

        nftAddress = buildCreate2Address(saltHex, bytecode);

    } catch (err) {
        console.error(err);
    }

    return nftAddress;
};

export default async function createCollection(
    contract: any,
    signer: any,

    name: string,
    symbol: string,
    salt: string | number,
    NFTs: NFT[],

    txParams: TransactionParams,
) {
    const contractAddress: string = await deployNFTContract(
        contract,
        name,
        symbol,
        salt,
    );
    const userPublicAddress: string = await signer.getAddress();
    const nftContract = new ethers.Contract(contractAddress, nftArtifact.abi, signer);

    await setNFTFactory(contractAddress, signer);

    for (let i = 0; i < NFTs.length; i++) {
        const { metadataLink, amount } = NFTs[i];

        for (let j = 1; j <= amount; j++) {
            uploadWithoutWait(nftContract, userPublicAddress, metadataLink, txParams);

            if (i === NFTs.length - 1 && j === amount) {
                await uploadAndWaitForMine(nftContract, userPublicAddress, metadataLink, txParams);
            }
        }
    }

    return contractAddress;
}
