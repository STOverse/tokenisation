const ERC1400Token = artifacts.require('./ERC1400.sol');
const WrappedSecurity = artifacts.require('./WrappedShares.sol');

const controller = ''; // deployer

const partition2 = '0x6973737565640000000000000000000000000000000000000000000000000000'; // issued in hex
const partition1 = '0x7265736572766564000000000000000000000000000000000000000000000000'; // reserved in hex
const partition3 = '0x6c6f636b65640000000000000000000000000000000000000000000000000000'; // locked in hex
const partitions = [partition1, partition2, partition3];

module.exports = async function (deployer, network, accounts) {
  if (network == "test") return; // test maintains own contracts
  
  await deployer.deploy(ERC1400Token, 'STOverse AG Shares', 'STOV', 1, [controller], partitions);
  console.log('\n   > ERC1400 token deployment: Success -->', ERC1400Token.address);
  await deployer.deploy(WrappedSecurity, ERC1400Token.address);
  console.log('\n   > Wrap token deployment: Success -->', WrappedSecurity.address);
};
