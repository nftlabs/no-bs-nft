// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721/IERC721.sol";

contract BidExecutor {

    mapping(address => bool) public registeredFactory;

    function registerNftFactory(address _factory) external {
        registeredFactory[_factory] = true;
    }

    function executeBid(uint _tokenId, address _bidder) external {
        require(registeredFactory[msg.sender], "Only a registered NFT factory can execute a bid.");

        address owner = IERC721(msg.sender).ownerOf(_tokenId);
        IERC721(msg.sender).safeTransferFrom(owner, _bidder, _tokenId, "");
    }
}