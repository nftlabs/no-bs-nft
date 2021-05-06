import { ethers } from 'ethers';

const encodeParams = (dataTypes: any[], data: any[]) => {
    const abiCoder = ethers.utils.defaultAbiCoder
    return abiCoder.encode(dataTypes, data)
}

export const buildBytecode = (
    constructorTypes: any[],
    constructorArgs: any[], contractBytecode: string) => {
  return `${contractBytecode}${encodeParams(constructorTypes, constructorArgs).slice(2)}`;
};

export const buildCreate2Address = (saltHex: string, byteCode: string) => {
    const factoryAddress = '0x8faD543dEecf009a37f24De9926e288c3C384adD'
    return `0x${ethers.utils
        .keccak256(
            `0x${['ff', factoryAddress, saltHex, ethers.utils.keccak256(byteCode)]
            .map((x) => x.replace(/0x/, ''))
            .join('')}`,
        )
    .slice(-40)}`.toLowerCase()
}

export const saltToHex = (salt: string | number) => ethers.utils.id(salt.toString())

const isContract = async (address: string, provider: any) => {
    const code = await provider.getCode(address)
    return code.slice(2).length > 0
}