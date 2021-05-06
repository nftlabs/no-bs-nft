const { expect } = require('chai');
const { ethers } = require('hardhat');

const { bytecode } = require('../artifacts/contracts/NFT.sol/NFT.json');

const encodeParams = (dataTypes, data) => {
  const abiCoder = ethers.utils.defaultAbiCoder
  return abiCoder.encode(dataTypes, data)
}

const saltToHex = (salt) => {
  ethers.utils.id(salt.toString());
}

const buildBytecode = (
  constructorTypes,
  constructorArgs,
  contractBytecode
) => {
  return `${contractBytecode}${encodeParams(constructorTypes, constructorArgs).slice(
    2,
  )}`;
};

const buildCreate2Address = (saltHex, byteCode) => {
  const factoryAddress = '0x8faD543dEecf009a37f24De9926e288c3C384adD'
  return `0x${ethers.utils
    .keccak256(
      `0x${['ff', factoryAddress, saltHex, ethers.utils.keccak256(byteCode)]
        .map((x) => x.replace(/0x/, ''))
        .join('')}`,
    )
    .slice(-40)}`.toLowerCase()
}

  function getCreate2Address({
    salt,
    contractBytecode,
    constructorTypes,
    constructorArgs,
  }) {
    return buildCreate2Address(
      saltToHex(salt),
      buildBytecode(constructorTypes, constructorArgs, contractBytecode),
    )
  }

describe('Should deploy contract and upload URI at the right places', () => {
  let deployer;
  let nftCreator;
  let contract;

  const nftName = 'create2test';
  const symbol = 'CRE8';
  const bidExecutorAddress = '0x539525b8081FeA30AE469Bd136dCd5CF5A5517b7';

  const constructorTypes = ["string", "string", "address"];
  const constructorArgs = [nftName, symbol, bidExecutorAddress];
  const salt = 1;

  const nftBytecode = buildBytecode(constructorTypes, constructorArgs, bytecode);
  const predictedAdress = getCreate2Address(salt, bytecode, constructorTypes, constructorArgs);

  beforeEach(async () => {
    [deployer, nftCreator] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory('OpenApeRegistry');
    contract = await contractFactory.deploy();
  });

  it('Should let emit native registration even upon nft deploy', async () => {

    const isRegisteredPreDeploy = await contract.isRegistered(predictedAdress);
    expect(isRegisteredPreDeploy).to.equal(false);

    await contract.deployNFT(nftBytecode, salt);

    const isRegisteredAfterDeploy = await contract.isRegistered(predictedAdress);
    expect(isRegisteredAfterDeploy).to.equal(true);
  });
});
