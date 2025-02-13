const SaqueRetirada = artifacts.require("SaqueRetirada");

contract("SaqueRetirada", (accounts) => {
  let instance;
  const user = accounts[0];
  const amount = web3.utils.toWei("1", "ether");

  before(async () => {
    instance = await SaqueRetirada.deployed();
  });

  it("deve depositar MATIC corretamente", async () => {
    await instance.depositar({ from: user, value: amount });
    const saldo = await instance.consultarSaldo({ from: user });
    assert.equal(saldo.toString(), amount, "Depósito falhou");
  });

  it("não deve permitir depósito com valor zero", async () => {
    try {
      await instance.depositar({ from: user, value: 0 });
      assert.fail("Depósito com valor zero deveria falhar");
    } catch (error) {
      assert.include(error.message, "O valor do depósito deve ser maior que 0", "Mensagem de erro incorreta");
    }
  });

  it("não deve permitir retirada com valor zero", async () => {
    try {
      await instance.retirar(0, { from: user });
      assert.fail("Retirada com valor zero deveria falhar");
    } catch (error) {
      assert.include(error.message, "O valor da retirada deve ser maior que 0", "Mensagem de erro incorreta");
    }
  });

  it("não deve permitir retirada com saldo insuficiente", async () => {
    const valorRetirada = web3.utils.toWei("2", "ether"); // Valor maior que o saldo
    try {
      await instance.retirar(valorRetirada, { from: user });
      assert.fail("Retirada com saldo insuficiente deveria falhar");
    } catch (error) {
      assert.include(error.message, "Saldo insuficiente", "Mensagem de erro incorreta");
    }
  });

  it("deve retirar MATIC corretamente", async () => {
    const valorRetirada = web3.utils.toWei("0.5", "ether");
    await instance.retirar(valorRetirada, { from: user });
    const saldo = await instance.consultarSaldo({ from: user });
    assert.equal(
      saldo.toString(),
      web3.utils.toWei("0.5", "ether"),
      "Retirada falhou"
    );
  });

  it("deve retirar todo o saldo corretamente", async () => {
    await instance.retirarTudo({ from: user });
    const saldo = await instance.consultarSaldo({ from: user });
    assert.equal(saldo.toString(), "0", "Retirada total falhou");
  });

  it("não deve permitir retirada total com saldo zero", async () => {
    try {
      await instance.retirarTudo({ from: user });
      assert.fail("Retirada total com saldo zero deveria falhar");
    } catch (error) {
      assert.include(error.message, "Nenhum saldo para retirar", "Mensagem de erro incorreta");
    }
  });

  it("não deve permitir retirada por outro usuário", async () => {
    await instance.depositar({ from: user, value: amount }); // Depósito inicial
    const valorRetirada = web3.utils.toWei("0.5", "ether");
    try {
      await instance.retirar(valorRetirada, { from: anotherUser }); // Tentativa de retirada por outro usuário
      assert.fail("Retirada por outro usuário deveria falhar");
    } catch (error) {
      assert.include(error.message, "Saldo insuficiente", "Mensagem de erro incorreta");
    }
  });

  it("deve permitir depósito e retirada por outro usuário", async () => {
    await instance.depositar({ from: anotherUser, value: amount });
    const saldo = await instance.consultarSaldo({ from: anotherUser });
    assert.equal(saldo.toString(), amount, "Depósito por outro usuário falhou");

    const valorRetirada = web3.utils.toWei("0.5", "ether");
    await instance.retirar(valorRetirada, { from: anotherUser });
    const saldoAtualizado = await instance.consultarSaldo({ from: anotherUser });
    assert.equal(
      saldoAtualizado.toString(),
      web3.utils.toWei("0.5", "ether"),
      "Retirada por outro usuário falhou"
    );
  });
});