var SafeMath = artifacts.require("SafeMath");
var CCLToken = artifacts.require("CCLToken");
var TokenSale = artifacts.require("TokenSale");

module.exports = function(deployer, network, accounts) {
  var rate = 10000;
  //if (network == 'development') {
    //constructor(address[] kycSigner, address _token, address _wallet, 
    // uint _startTime, uint _endTime, uint _price, uint _totalTokens)
    
    var kycSigners = [];
    
    var initialDelay = web3.eth.getBlock(web3.eth.blockNumber).timestamp;
    var startTime = initialDelay;
    var endTime = startTime + (3600 * 24 * 5); // 5 일 운영
    var price = rate;
    var totalTokens = 400000000000000000000000000;
    var address = CCLToken.address;
    var wallet = accounts[0];
      
    if (network == "development") {
      kycSigners = [0xdd5ecefcaa0cb5d75f7b72dc9d2ce446d6d00520, 0x4e315e5de2abbf7b745d9628ee60e4355c0fab86, 0x627306090abaB3A6e1400e9345bC60c78a8BEf57];
      
    } else if (network == 'ropsten') {

    } else if (network == 'eidoo') {
      kycSigners = [0xdd5ecefcaa0cb5d75f7b72dc9d2ce446d6d00520, 0x4e315e5de2abbf7b745d9628ee60e4355c0fab86, 0x627306090abaB3A6e1400e9345bC60c78a8BEf57];
    } else if (network == 'mainnet') {
      address = '0x749f35Ff65932E68267dd82F6CD85eeA735d700E';
      wallet = '0xf835bF0285c99102eaedd684b4401272eF36aF65';
      startTime = moment.utc('2018-07-10 00:00').toDate().getTime() / 1000;
      endTime = moment.utc('2018-08-31 24:00').toDate().getTime() / 1000;
      
  }
  console.log('network:' + network);
  console.log('kycSigner:' + kycSigners);
  console.log('wallet:' + wallet);
  console.log('startTime:' + startTime);
  console.log('endTime:' + endTime);
  console.log('price:' + price);
  console.log('totalToken:' + totalTokens);
  
  deployer.deploy(SafeMath).then(function() {
    deployer.deploy(TokenSale,
      kycSigners,
      address,
      wallet,
      startTime,
      endTime,
      price,
      totalTokens
    ).then(function() {
      deployer.link(SafeMath, TokenSale).then(function() {
        console.log('CCL:' + address);
        console.log('TOKENSALE:' + TokenSale.address);
  
        var ccl = CCLToken.at(address);
        ccl.approve(TokenSale.address, totalTokens);
      }).catch(function(reason) {
        console.log(reason);
      });
    }).catch(function(reason) {
      console.log(reason);
    });
  });
};
