const SaqueRetirada = artifacts.require("SaqueRetirada");

module.exports = function (deployer) {
  deployer.deploy(SaqueRetirada, "Operação realizada com sucesso!");
};