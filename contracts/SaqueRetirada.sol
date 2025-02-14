// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SaqueRetirada {

    mapping(address => uint256) public saldos;

    event Deposito(address indexed usuario, uint256 valor);
    event Retirada(address indexed usuario, uint256 valor);

    function depositar() external payable {
        require(msg.value > 0, "O valor do deposito deve ser maior que 0");

        saldos[msg.sender] += msg.value;

        emit Deposito(msg.sender, msg.value);
    }

    function consultarSaldo() external view returns (uint256) {
        return saldos[msg.sender];
    }

    function retirar(uint256 valor) external {
        require(valor > 0, "O valor da retirada deve ser maior que 0");
        require(saldos[msg.sender] >= valor, "Saldo insuficiente");

        saldos[msg.sender] -= valor;

        (bool sucesso, ) = msg.sender.call{value: valor}("");
        require(sucesso, "Falha na retirada");

        emit Retirada(msg.sender, valor);
    }

    function retirarTudo() external {
        uint256 saldo = saldos[msg.sender];
        require(saldo > 0, "Nenhum saldo para retirar");

        saldos[msg.sender] = 0;

        (bool sucesso, ) = msg.sender.call{value: saldo}("");
        require(sucesso, "Falha na retirada");

        emit Retirada(msg.sender, saldo);
    }
}