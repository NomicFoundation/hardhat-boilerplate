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

  fs.writeFileSync(
    contractsDir + "/contracts-addresses.json",
    JSON.stringify(contractsObj, undefined, 2)
  );
}


module.exports = {
  saveFrontendFiles,
};
