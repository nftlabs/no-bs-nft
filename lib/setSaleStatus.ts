import ethers from 'ethers';

interface TransactionParams {
  gasLimit: number;
  txNonce: number;
  gasPrice: string;
}


export const putNFTOnSale = async (contract: any, tokenId: number, priceInEther: string, txParams: TransactionParams ) => {
  
  const active: boolean = true;
  const price = ethers.utils.parseEther(priceInEther);

  try {
    const tx = await contract.setThreshold(tokenId, price, active, {...txParams});
    // wait for the tx to be confirmed    
    await tx.wait()

    return tx
  } catch(err) {
    console.error(err)
  }
}

export const takeNFTOffSale = async (contract: any, tokenId: number, txParams: TransactionParams ) => {
  
  const active: boolean = false;
  const price = ethers.utils.parseEther('0');

  try {
    const tx = await contract.setThreshold(tokenId, price, active, {...txParams});
    // wait for the tx to be confirmed    
    await tx.wait()

    return tx
  } catch(err) {
    console.error(err)
  }
}