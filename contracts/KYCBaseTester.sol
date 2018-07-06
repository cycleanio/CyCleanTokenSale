pragma solidity ^0.4.21;

import "./KYCBase.sol";

// this is for testing purpose, do not use it in production
contract KYCBaseTester is KYCBase {

    event ReleaseTokensToCalled(address buyer);    

    constructor(address[] signers) public
        KYCBase(signers)
    {}

    function releaseTokensTo(address buyer) internal returns(bool) {
        emit ReleaseTokensToCalled(buyer);
        return true;
    }

    function senderAllowedFor(address buyer)
        internal view returns(bool)
    {
        bool value = super.senderAllowedFor(buyer);
        return value;
    }
}