import ethers from 'ethers';

// / Returns the contract object connected with signer.
export default function getContractObject(address: string, abi: any, signer: any) {
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
};