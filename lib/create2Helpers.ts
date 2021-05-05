// import { ethers } from 'ethers';
// import { compileERC721 } from './compile';
// import { abi } from '../artifacts/contracts/OpenApeRegistry.sol/OpenApeRegistry.json';

const { ethers } = require('ethers');
const { abi } = require('../artifacts/contracts/OpenApeRegistry.sol/OpenApeRegistry.json');

const ALCHEMY_API_KEY = '7kwH0c_l1lJSG-8-ty4yzt_JrUSyPcPS';
const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    'rinkeby',
);
const wallet = new ethers.Wallet(
    '0x0x72c7aa775909348220c3d1ca7651bd71109356c671dddc81738bfefe0561642a',
    provider,
);

const Registry = new ethers.Contract('0x8faD543dEecf009a37f24De9926e288c3C384adD', abi, wallet);

const buildCreate2Address = (creatorAddress: string, saltHex: string, bytecode: string) => {
    const hashedByteCode = ethers.utils.keccak256(bytecode);
    const bytes = `0x${['ff', creatorAddress, saltHex, hashedByteCode]
        .map((x) => x.replace(/0x/, ''))
        .join('')}`;

    return `0x${ethers.utils.keccak256(bytes).slice(-40)}`.toLowerCase();
};

const numberToUint256 = (value: number) => {
    const hex = value.toString(16);
    return `0x${'0'.repeat(64 - hex.length)}${hex}`;
};

const encodeParam = (dataType: string, data: any) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    return abiCoder.encode([dataType], [data]);
};

const isContract = async (address: string) => {
    const code = await provider.getCode(address);
    return code.slice(2).length > 0;
};

module.exports = {
    buildCreate2Address,
    numberToUint256,
    encodeParam,
    isContract,
};
