const fs = require("fs");

/**
 * Save the contract's artifacts and address in the frontend directory
 * @param {Object} contracts Contract name is the key, artifact is the value
 */
function saveFrontendFiles(contractsObj) {
  if (typeof contractsObj !== 'object' || contractsObj === null) {
    throw Error("Contract object is not correct type");
  }

  const contractsDir = __dirname + "/../frontend/src/contracts";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  saveContractsAddresses(contractsDir, contractsObj);
  saveContractsArtifacts(contractsDir, contractsObj);
}

function saveContractsAddresses(contractsDir, contractsObj) {
  const addresses = {};
  Object.keys(contractsObj).forEach((key) => { 
    addresses[key] = contractsObj[key].address;
  });
  
  fs.writeFileSync(
    contractsDir + "/contracts-addresses.json",
    JSON.stringify(addresses, undefined, 2)
  );
}

function saveContractsArtifacts(contractsDir, contractsObj) {
  Object.keys(contractsObj).map((key) => {
    const contractName = contractsObj[key].contractName;
    const ContractArtifact = artifacts.readArtifactSync(contractName);
    fs.writeFileSync(
      `${contractsDir}/${contractName}.json`,
      JSON.stringify(ContractArtifact, null, 2)
    );
  })
}


module.exports = {
  saveFrontendFiles,
};
