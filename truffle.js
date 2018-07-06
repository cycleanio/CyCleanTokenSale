/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: 5777,
            gas: 6712388,
            gasPrice: 1000000
        },
        ropsten:  {
        network_id: 3,
        host: "localhost",
        port:  8545,
        gas:   4700000,
        gasPrice: 60000000000,
        },
        eidoo: {
            host: "wally-api-dev.undo.it",
            port: 8545,
            gas: 4700000,
            gasPrice: 65000000000,
            network_id: "*"
        }
     },
    rpc: {
        host: 'localhost',
        post:8080
    },
    solc: {
        optimizer: {
          enabled: true,
          runs: 200
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions : {
          currency: 'KRW',
          gasPrice: 1000000
        }
      }
};
