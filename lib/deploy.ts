import { ethers } from 'ethers';
import { supportedIds } from './supportedIds';

interface ContractObject {
    abi: any;
    bytecode: any;
}

// / Gets the contract factory object for the given ABI and bytecode.
const factory = async (abi: any, bytecode: any, signer: any) => {
    return new ethers.ContractFactory(abi, bytecode, signer);
};

// / Deploys the NFT contract.
export const deployERC721 = async (
    NftObject: ContractObject,
    name: string,
    symbol: string,
    bidExecutorAddress: string,
    signer: any,
) => {
    const NFT_contractFactory = await factory(NftObject.abi, NftObject.bytecode, signer);

    try {
        const nftFactory = await NFT_contractFactory.deploy(name, symbol, bidExecutorAddress);
        const accountAddress = await signer.getAddress();

        console.log('NFT contract deployed at: ', nftFactory.address);
        console.log('Deployed with account: ', accountAddress);

        const tx = nftFactory.deployTransaction;
        console.log('Transaction hash: ', tx.hash);
        await tx.wait();
        console.log('Transaction successful');

        return {
            tx,
            address: nftFactory.address,
        };
    } catch (err) {
        console.log(err);
    }
};

// / Deploys a helper contract for the NFT's auction system.
export const deployBidExecutor = async (BidExecutorObject: ContractObject, signer: any) => {
    const BidExecutor_contractFactory = await factory(
        BidExecutorObject.abi,
        BidExecutorObject.bytecode,
        signer,
    );

    try {
        const bidExecutor = await BidExecutor_contractFactory.deploy();
        const accountAddress = await signer.getAddress();

        console.log('BidExecutor contract deployed at: ', bidExecutor.address);
        console.log('Deployed with account: ', accountAddress);

        const bidExecutorTx = bidExecutor.deployTransaction;
        console.log('Transaction hash: ', bidExecutorTx.hash);
        await bidExecutorTx.wait();
        console.log('Transaction successful');

        return {
            tx: bidExecutorTx,
            address: bidExecutor.address,
        };
    } catch (err) {
        console.log(err);
    }
};

// / Points the helper auction contract to the NFT contract.
export const setNFTFactory = async (
    bidExecutorAddress: string,
    bidExecutorAbi: any,
    nftAddress: string,
    signer: any,
) => {
    try {
        const bidExecutor = new ethers.Contract(bidExecutorAddress, bidExecutorAbi, signer);

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
    NftObject: ContractObject,
    BidExecutorObject: ContractObject,
    signer: any,
    name: string,
    symbol: string,
    chainId: number,
) => {
    let bidExecutorAddress: string;
    let nftAddress: string;

    try {
        const { tx, address }: any = await deployBidExecutor(BidExecutorObject, signer);
        await tx.wait();
        bidExecutorAddress = address;
    } catch (err) {
        console.error(err);
    }

    try {
        const { tx, address }: any = await deployERC721(
            NftObject,
            name,
            symbol,
            bidExecutorAddress,
            signer,
        );
        await tx.wait();
        nftAddress = address;
    } catch (err) {
        console.error(err);
    }

    try {
        const { tx }: any = await setNFTFactory(
            bidExecutorAddress,
            BidExecutorObject.abi,
            nftAddress,
            signer,
        );
        await tx.wait();
    } catch (err) {
        console.error(err);
    }

    if (!(chainId === 137 || chainId === 80001)) {
        await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                network: supportedIds[(chainId as number).toString()].name.toLowerCase(),
                nft_address: nftAddress,
                bidExecutor_address: bidExecutorAddress,
                name,
                symbol,
            }),
        });
    }

    return nftAddress;
};

