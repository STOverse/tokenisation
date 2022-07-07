require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('@truffle/hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) => () =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

// const infuraProvider = network => providerWithMnemonic(
//   process.env.MNEMONIC || '',
//   `https://goerli.infura.io/v3/API_KEY`
// );

const providerFactory = network =>
  new HDWalletProvider(
    'Mnemonics' || "", // Mnemonics of the deployer
    `https://polygon-mainnet.infura.io/v3/API_KEY`, // Provider URL => web3.HttpProvider
    0
  );

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // eslint-disable-line camelcase
      gasPrice: 0x01,
    },
    test: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      gasPrice: 0x01,
    },
    polygon: {
      provider: providerFactory("polygon"),
      network_id: '137', // eslint-disable-line camelcase
      gasPrice: 48000000000,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200
    },
    coverage: {
      host: 'localhost',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      disableConfirmationListener: true,
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // eslint-disable-line camelcase
    },
    dotEnvNetwork: {
      provider: providerWithMnemonic(
        process.env.MNEMONIC,
        process.env.RPC_ENDPOINT
      ),
      network_id: parseInt(process.env.NETWORK_ID) || '*', // eslint-disable-line camelcase
    },
  },
  plugins: ["solidity-coverage", "truffle-contract-size", "truffle-plugin-verify"],
  compilers: {
    solc: {
      version: '0.8.7',
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 0, // Default: 200
        },
      },
    },
  },
  api_keys: {
    polygonscan: "" // API_KEY verifier
  },
};
