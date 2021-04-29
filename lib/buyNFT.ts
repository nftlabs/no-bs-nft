import ethers from 'ethers';

export default async function buyNFT(contract: any, tokenId: number, priceInEther: string) {

  const price = ethers.utils.parseEther(priceInEther);

  try {
    const tx = await contract.makeBid(tokenId, price);
    // Wait for tx to confirm
    await tx.wait();

    return tx;
  } catch(err) {
    console.error(err)
  }
}