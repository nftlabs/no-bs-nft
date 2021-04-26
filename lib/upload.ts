import { ethers } from "ethers"

interface TransactionParams {
	gasLimit: number;
	txNonce: number;
	gasPrice: string;
}

/// Returns the contract object connected with signer.
export const getContractObject = (address: string, abi: any, signer: any) => {
	const contract = new ethers.Contract(address, abi, signer);
	return contract
}

/// Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
/// Returns the transaction receipt. Returns an empty string '' upon error.
export const uploadAndWaitForConfirmation = async (
	contract: any, to: string, URI: string, txParams: TransactionParams
) => {

	const { gasLimit, txNonce, gasPrice} = txParams;

	try {
		// Wait for the transaction to be mined.
		const tx = await contract.mint(to, URI, {
			gasLimit: gasLimit,
			nonce: txNonce,
			gasPrice: ethers.utils.parseUnits(gasPrice, "gwei")
		})

		// Wait for the transaction to be confirmed
		await tx.wait();

		return tx
	} catch(err) {
		console.log(err);
		return ''
	}
}

/// Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
/// Returns the transaction object. Returns an empty string '' upon error.
export const uploadAndWaitForMine = async (
	contract: any, to: string, URI: string, txParams: TransactionParams
) => {

	const { gasLimit, txNonce, gasPrice} = txParams;

	try {
		// Wait for the transaction to be mined.
		const tx = await contract.mint(to, URI, {
			gasLimit: gasLimit,
			nonce: txNonce,
			gasPrice: ethers.utils.parseUnits(gasPrice, "gwei")
		})

		return tx
	} catch(err) {
		console.log(err);
		return ''
	}
}

/// Uploads token to NFT contract. Waits for the upload transaction to be mined and confirmed.
/// Returns the transaction nonce to use for the next transaction. Returns 0 upon error.
export const uploadWithoutWait = async (
	contract: any, to: string, URI: string, txParams: TransactionParams
) => {

	const { gasLimit, txNonce, gasPrice} = txParams;

	try {
		// Wait for the transaction to be mined.
		contract.mint(to, URI, {
			gasLimit: gasLimit,
			nonce: txNonce,
			gasPrice: ethers.utils.parseUnits(gasPrice, "gwei")
		})

		return txNonce + 1
	} catch(err) {
		console.log(err);
		return 0
	}
}
