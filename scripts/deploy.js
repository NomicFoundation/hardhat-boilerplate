// This is a script for deploying your contracts via Hardhat Ignition. You can adapt it to deploy
// yours, or create new ones.

const path = require('path')

const TokenModule = require('../ignition/modules/TokenModule')

async function main() {
  // This is just a convenience check
  if (network.name === 'hardhat') {
    console.warn(
      'You are trying to deploy a contract to the Hardhat Network, which' +
        'gets automatically created and destroyed every time. Use the Hardhat' +
        " option '--network localhost'"
    )
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners()
  console.log(
    'Deploying the contracts with the account:',
    await deployer.getAddress()
  )

  console.log('Account balance:', (await deployer.getBalance()).toString())

  // ignition is available in the global scope
  await ignition.deploy(TokenModule)

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles()
}

function saveFrontendFiles() {
  const fs = require('fs')
  const contractsDir = path.join(
    __dirname,
    '..',
    'frontend',
    'src',
    'contracts'
  )

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  // `chain-31337` will be deployment ID if you deploy to hardhat network.
  // Be sure to change this line if you use this script on another network.
  const deploymentDir = path.join(
    __dirname,
    '..',
    'ignition',
    'deployments',
    'chain-31337'
  )

  const deployedAddresses = JSON.parse(
    fs.readFileSync(path.join(deploymentDir, 'deployed_addresses.json'))
  )

  fs.writeFileSync(
    path.join(contractsDir, 'contract-address.json'),
    JSON.stringify(
      { Token: deployedAddresses['TokenModule#Token'] },
      undefined,
      2
    )
  )

  const TokenArtifact = artifacts.readArtifactSync('Token')

  fs.writeFileSync(
    path.join(contractsDir, 'Token.json'),
    JSON.stringify(TokenArtifact, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
