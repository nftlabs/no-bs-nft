import React, { useEffect, useState } from 'react';
import { Magic } from 'magic-sdk';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import useUser from '../../../lib/useUser';
import { MagicMaticClient } from '../../../lib/magic';
import { putNFTOnSale, takeNFTOffSale } from '../../../lib/setSaleStatus';
import buyNFT from '../../../lib/buyNFT';

export default function NFT(): JSX.Element {
    const [contract, setContract] = useState<Contract | null>(null);
    const [signer, getSigner] = useState<Signer | null>(null);

    const { user, login, logout } = useUser();

    useEffect(() => {
        
    })

    const handleNftBuy = async () => {
        
    }

    const handlePutOnSale = async () => {
        
    }

    const handleTakeOffSale = async () => {
        
    }

    const handleChangePrice = async () => {
        
    }
    return <></>;
}
