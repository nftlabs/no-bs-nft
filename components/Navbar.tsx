import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import {
  HStack,
  Link
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function Navbar(): JSX.Element {

  const context = useWeb3React<Web3Provider>()
  const { chainId, account } = context

  const router = useRouter();

  return (
    <div className={`w-full flex justify-between py-4 sticky top-0 bg-white mb-16 ${router.pathname == "/" ? "" : "hidden"}`}>
      <HStack ml="8">
        <Link href="https://discord.gg/baNTHHBD36" isExternal>
          <HStack spacing="4">
            <Image
              src="/nftlabs-logo.png"
              width={32}
              height={38.635}
              priority={true}            
            />
            <p className="text-gray-800 font-black text-3xl ml-8 mr-8">
              No bullshit NFT
            </p>
          </HStack>                                      
        </Link>
      </HStack>
      
      <div className="flex items-end mr-8 xl:mr-16">
        <HStack spacing="8">
          <Link href="https://discord.gg/baNTHHBD36" isExternal>
            <HStack spacing="2">
              <Image
                src="/discord-logo.png"
                width={24}
                height={24}
                priority={true}
              />
              <p className="hidden md:block">
                Join us on Discord
              </p>
            </HStack>                                      
          </Link>
          <Link href="https://www.notion.so/No-BS-NFTs-8f2b9490317e426587ef038b56e0bc8c" isExternal>
            <HStack spacing="4">
              <InfoOutlineIcon />
              <p className="hidden md:block">
                Docs
              </p>
            </HStack>                                      
          </Link>                                                                  
        </HStack>
      </div>
    </div>
  )
}