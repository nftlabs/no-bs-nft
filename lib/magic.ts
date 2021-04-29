import { Magic as MagicServer } from '@magic-sdk/admin';
import { Magic as MagicClient } from 'magic-sdk';
import { isClient } from './isClient';
import { RPCConnector } from './rpc_connector';

export const magicServer = new MagicServer(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY);
export const magicClient = isClient()
    ? new MagicClient('pk_test_F7501FE7D4DD5B80', {
          network: 'ropsten',
      })
    : null;

export const magicRPCConnector = new RPCConnector({
    rpcProvider: magicClient?.rpcProvider,
    chainId: 3,
});

