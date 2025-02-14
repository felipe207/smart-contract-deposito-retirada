const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { MNEMONIC, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  networks: {
    // Configuração para a rede Polygon Mainnet
    polygon: {
      provider: () => new HDWalletProvider({
        mnemonic: MNEMONIC,
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: `https://polygon-rpc.com/`, // RPC da Polygon Mainnet
      }),
      network_id: 137, // ID da rede Polygon Mainnet
      gas: 5500000, // Limite de gás
      confirmations: 2, // Número de confirmações necessárias
      timeoutBlocks: 200, // Tempo máximo de espera por blocos
      skipDryRun: true, // Pular execução a seco
    },

    // Configuração para a rede Polygon Mumbai (testnet)
    mumbai: {
      provider: () => new HDWalletProvider({
        mnemonic: MNEMONIC,
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: `https://rpc-mumbai.maticvigil.com/`, // RPC da Polygon Mumbai Testnet
      }),
      network_id: 80001, // ID da rede Mumbai Testnet
      gas: 5500000, // Limite de gás
      confirmations: 2, // Número de confirmações necessárias
      timeoutBlocks: 200, // Tempo máximo de espera por blocos
      skipDryRun: true, // Pular execução a seco
    },
  },

  // Configuração do compilador Solidity
  compilers: {
    solc: {
      version: "0.8.0", // Versão do Solidity
      settings: {
        optimizer: {
          enabled: true, // Ativar otimizador
          runs: 200, // Número de execuções para otimização
        },
      },
    },
  },

  // Configuração do plugin para verificação de contratos no Polygonscan
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: POLYGONSCAN_API_KEY, // Chave API do Polygonscan
  },
};