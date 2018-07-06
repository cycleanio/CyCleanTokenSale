pragma solidity ^0.4.21;

import "./ICOEngineInterface.sol";
import "./KYCBase.sol";
import "./SafeMath.sol";
import "./CCLToken.sol";

contract TokenSale is ICOEngineInterface, KYCBase {
    using SafeMathLib for uint;
    
    event ReleaseTokensToCalled(address buyer);
    
    event ReleaseTokensToCalledDetail(address wallet, address buyer, uint amount, uint remainingTokensValue);
    event SenderCheck(address sender);
    
    CCLToken public token;
    address public wallet;
   
    // from ICOEngineInterface
    uint private priceValue;
    function price() public view returns(uint) {
        return priceValue;
    }

    // from ICOEngineInterface
    uint private startTimeValue;
    function startTime() public view returns(uint) {
        return startTimeValue;
    }

    // from ICOEngineInterface
    uint private endTimeValue;
    function endTime() public view returns(uint) {
        return endTimeValue;
    }
    // from ICOEngineInterface
    uint private totalTokensValue;
    function totalTokens() public view returns(uint) {
        return totalTokensValue;
    }
    
    // from ICOEngineInterface
    uint private remainingTokensValue;
    function remainingTokens() public view returns(uint) {
        return remainingTokensValue;
    }
    

    /**
     *  After you deployed the SampleICO contract, you have to call the ERC20
     *  approve() method from the _wallet account to the deployed contract address to assign
     *  the tokens to be sold by the ICO.
     */
    constructor ( address[] kycSigner, CCLToken _token, address _wallet, uint _startTime, uint _endTime, uint _price, uint _totalTokens)
        public KYCBase(kycSigner)
    {
        token = _token;
        wallet = _wallet;
        //emit WalletCheck(_wallet);
        startTimeValue = _startTime;
        endTimeValue = _endTime;
        priceValue = _price;
        totalTokensValue = _totalTokens;
        remainingTokensValue = _totalTokens;
    }

    // from KYCBase
    function releaseTokensTo(address buyer) internal returns(bool) {
        //emit SenderCheck(msg.sender);
        require(now >= startTimeValue && now < endTimeValue);
        uint amount = msg.value.mul(priceValue);
        remainingTokensValue = remainingTokensValue.sub(amount);
        emit ReleaseTokensToCalledDetail(wallet, buyer, amount, remainingTokensValue);
        
        wallet.transfer(msg.value);
        require(this == token.owner());
        token.transferFrom(wallet, buyer, amount);
        emit ReleaseTokensToCalled(buyer);
        return true;
    }

    // from ICOEngineInterface
    function started() public view returns(bool) {
        return now >= startTimeValue;
    }

    // from ICOEngineInterface
    function ended() public view returns(bool) {
        return now >= endTimeValue || remainingTokensValue == 0;
    }

    function senderAllowedFor(address buyer)
        internal view returns(bool)
    {
        bool value = super.senderAllowedFor(buyer);
        return value;
    }

    function acceptOwnership() public {
        token.acceptOwnership();
    }

    function transferOwnership(address owner) public {
        //require(this == msg.sender);
        token.transferOwnership(owner);
    }
}