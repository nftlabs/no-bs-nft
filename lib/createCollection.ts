import { ethers } from 'ethers';

import { deployNFTContract } from './deploy';
import { uploadWithoutWait, uploadAndWaitForMine } from './upload';

interface ContractObject {
    abi: any;
    bytecode: any;
}

interface NFT {
    metadataLink: string;
    amount: number;
}

interface TransactionParams {
    gasLimit: number;
    txNonce: number;
    gasPrice: ethers.BigNumber;
}

/**
 * 1. Deploys NFT + auction system contracts
 * 2. Uploads all NFTs according to the given NFT info like name, amount, etc.
 * 3. Only awaits the last transaction. Sends the user an email notification once all the NFTs have been
 *    uploaded to the collection.
 *
 * @param NftObject
 * @param BidExecutorObject
 * @param name
 * @param symbol
 * @param NFTs
 * @param signer
 * @param chainId
 * @param txParams
 * @param userEmail
 * @param userPublicAddress
 */
export default async function createCollection(
    NftObject: ContractObject,
    BidExecutorObject: ContractObject,

    name: string,
    symbol: string,

    NFTs: NFT[],

    signer: any,
    chainId: number,
    txParams: TransactionParams,

    userEmail: string,
    userPublicAddress: string,
) {
    const contractAddress: string = await deployNFTContract(
        NftObject,
        BidExecutorObject,
        signer,
        name,
        symbol,
        chainId,
    );

    const contract = new ethers.Contract(contractAddress, NftObject.abi, signer);

    let txNonce_magic: number = parseInt((await signer.getTransactionCount()).toString());
    let finalTx;

    for (let i = 0; i < NFTs.length; i++) {
        const { metadataLink, amount } = NFTs[i];

        for (let j = 1; j <= amount; j++) {
            txNonce_magic = uploadWithoutWait(contract, userPublicAddress, metadataLink, txParams);

            if (i === NFTs.length - 1 && j === amount) {
                finalTx = await uploadAndWaitForMine(
                    contract,
                    userPublicAddress,
                    metadataLink,
                    txParams,
                );

                fetch('/api/magicUpload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        publicAddress: userPublicAddress,
                        contractAddress: contract.address,
                        chainId,
                        txNonce: txNonce_magic,
                    }),
                });
            }
        }
    }

    return contractAddress;
}
