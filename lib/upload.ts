import { ethers } from 'ethers';

interface TransactionParams {
    gasLimit: number;
    gasPrice: ethers.BigNumber;
}

// / Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
// / Returns the transaction receipt. Returns an empty string '' upon error.
export const uploadAndWaitForConfirmation = async (
    contract: any,
    to: string,
    URI: string,
    txParams: TransactionParams,
) => {
    const { gasLimit, gasPrice } = txParams;

    try {
        // Wait for the transaction to be mined.
        const tx = await contract.mint(to, URI, {
            gasLimit,
            gasPrice,
        });

        // Wait for the transaction to be confirmed
        await tx.wait();

        return tx;
    } catch (err) {
        console.error(err);
        return '';
    }
};

// / Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
// / Returns the transaction object. Returns an empty string '' upon error.
export const uploadAndWaitForMine = async (
    contract: any,
    to: string,
    URI: string,
    txParams: TransactionParams,
) => {
    const { gasLimit, gasPrice } = txParams;

    try {
        // Wait for the transaction to be mined.
        const tx = await contract.mint(to, URI, {
            gasLimit,
            gasPrice,
        });

    } catch (err) {
        console.error(err);
    }
};

// / Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
// / Returns the transaction nonce to use for the next transaction. Returns 0 upon error.
export const uploadWithoutWait = (
    contract: any,
    to: string,
    URI: string,
    txParams: TransactionParams,
) => {
    const { gasLimit, gasPrice } = txParams;

    try {
        // Wait for the transaction to be mined.
        contract.mint(to, URI, {
            gasLimit,
            gasPrice,
        });
    } catch (err) {
        console.error(err);
    }
};
