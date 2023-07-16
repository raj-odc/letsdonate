// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './Fundraiser.sol';
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract FundraiserFactory {
    uint256 constant maxLimit = 20;
    Fundraiser[] public _fundraisers;

    event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

    function createFundraiser(
        string memory name,
        string memory image,
        string memory description,
        uint256 goalAmount,
        address payable beneficiary
    ) public {
        Fundraiser fundraiser = new Fundraiser(
        name,
        image,
        description,
        goalAmount,
        beneficiary
        );
        _fundraisers.push(fundraiser);
        emit FundraiserCreated(fundraiser, msg.sender);
    }

    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    function fundraisers(uint256 limit, uint256 offset)
        public
        view
        returns (Fundraiser[] memory collections)
    {
        require(offset <= fundraisersCount(), 'offset out of bounds');

        uint256 size = fundraisersCount() - offset;
        size = size < limit ? size : limit;
        size = size < maxLimit ? size : maxLimit;
        collections = new Fundraiser[](size);

        for (uint256 i = 0; i < size; i++) {
        collections[i] = _fundraisers[offset + i];
        }

        return collections;
    }
}
