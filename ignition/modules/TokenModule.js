const { buildModule } = require('@nomicfoundation/hardhat-toolbox')

module.exports = buildModule('TokenModule', async (m) => {
  const hardhatToken = m.contract('Token')

  return { hardhatToken }
})
