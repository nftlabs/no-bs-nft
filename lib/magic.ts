import { Magic as MagicServer } from '@magic-sdk/admin';
import { Magic as MagicClient } from 'magic-sdk';
import { isClient } from './isClient';

export const magicServer = new MagicServer(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY);

export const MagicMaticClient = isClient()
  ? new MagicClient(process.env.NEXT_PUBLIC_MAGIC_KEY, {
      network: {
        rpcUrl: 'https://rpc-mainnet.maticvigil.com/v1/084e575b9401d628d1507747de3e0f72ef07261c/',
        chainId: 137,
      },
    })
  : null;

export const MagicMumbaiClient = isClient()
  ? new MagicClient(process.env.NEXT_PUBLIC_MAGIC_KEY, {
      network: {
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/v1/084e575b9401d628d1507747de3e0f72ef07261c',
        chainId: 137,
      },
    })
  : null;

export const MagicRinkebyClient = isClient()
  ? new MagicClient(process.env.NEXT_PUBLIC_MAGIC_KEY, {
      network: {
        rpcUrl: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        chainId: 137,
      },
    })
  : null;
