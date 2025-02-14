const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { MNEMONIC, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  networks: {
    polygon: {
      provider: () => new HDWalletProvider({
        mnemonic: MNEMONIC,
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: `https://polygon-rpc.com/`,
      }),
      network_id: 137,
      gas: 5500000, 
      confirmations: 2, 
      timeoutBlocks: 200,
      skipDryRun: true, 
    },

    mumbai: {
      provider: () => new HDWalletProvider({
        mnemonic: MNEMONIC,
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: `https://rpc-mumbai.maticvigil.com/`, 
      }),
      network_id: 80001, 
      gas: 5500000, 
      confirmations: 2, 
      timeoutBlocks: 200, 
      skipDryRun: true, 
    },
  },

  compilers: {
    solc: {
      version: "0.8.0", 
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: POLYGONSCAN_API_KEY, 
  },
};