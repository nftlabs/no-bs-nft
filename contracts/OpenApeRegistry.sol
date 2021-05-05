// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OpenApeRegistry {

    mapping(address => bool) public isRegistered;

    struct RegisteredAddresses {
        uint count;
        mapping(uint => address) registeredAddress;
    }
    
    RegisteredAddresses Registry;

    event NativeRegistration(address indexed _deployer, address _contract);
    event ExternalRegistration(address indexed _deployer, address _contract);

    function nativeRegister(address _deployer, address _contract) internal {
        Registry.registeredAddress[Registry.count] = _contract;
        Registry.count += 1;

        isRegistered[_contract] = true;

        emit NativeRegistration(_deployer, _contract);
    }

    function externalRegister(address _deployer, address _contract) external {
        Registry.registeredAddress[Registry.count] = _contract;
        Registry.count += 1;

        isRegistered[_contract] = true;

        emit ExternalRegistration(_deployer, _contract);
    }

    function deployNFT(bytes memory nftBytecode, uint256 salt) public {
        address nftAddress;
        assembly {
            nftAddress := create2(0, add(nftBytecode, 0x20), mload(nftBytecode), salt)
            
            if iszero(extcodesize(nftAddress)) {
                revert(0, 0)
            }
        }

        nativeRegister(msg.sender, nftAddress);  
    }

    function getNumberOfRegisteredAddresses() external view returns (uint) {
        return Registry.count;
    }

    function getAllRegisteredAddresses() external view returns (address[] memory registeredAddresses) {

        address[] memory addresses = new address[](Registry.count);

        for (uint i = 0; i < Registry.count; i++) {
            addresses[i] = Registry.registeredAddress[i];
        }

        registeredAddresses = addresses;
    }
}