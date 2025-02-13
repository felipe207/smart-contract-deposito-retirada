module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Endereço do Ganache
      port: 7545,        // Porta RPC do Ganache
      network_id: "*",   // Qualquer network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",  // Versão do Solidity
    },
  },
};