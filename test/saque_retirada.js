const SaqueRetirada = artifacts.require("SaqueRetirada");

contract("SaqueRetirada", (accounts) => {
  let instance;
  const user = accounts[0];
  const amount = web3.utils.toWei("1", "ether");

  before(async () => {
    instance = await SaqueRetirada.deployed();
  });

  it("deve depositar MATIC corretamente", async () => {
    await instance.deposit({ from: user, value: amount });
    const balance = await instance.getBalance({ from: user });
    assert.equal(balance.toString(), amount, "Depósito falhou");
  });

  it("deve retirar MATIC corretamente", async () => {
    const amountToWithdraw = web3.utils.toWei("0.5", "ether");
    await instance.withdraw(amountToWithdraw, { from: user });
    const balance = await instance.getBalance({ from: user });
    assert.equal(
      balance.toString(),
      web3.utils.toWei("0.5", "ether"),
      "Retirada falhou"
    );
  });

  it("deve retirar todo o saldo corretamente", async () => {
    await instance.withdrawAll({ from: user });
    const balance = await instance.getBalance({ from: user });
    assert.equal(balance.toString(), "0", "Retirada total falhou");
  });
});