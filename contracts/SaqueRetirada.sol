// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SaqueRetirada {
    // Mapeamento para armazenar o saldo de cada usuário
    mapping(address => uint256) public saldos;

    // Eventos para registrar depósitos e retiradas
    event Deposito(address indexed usuario, uint256 valor);
    event Retirada(address indexed usuario, uint256 valor);

    // Função para depositar MATIC no contrato
    function depositar() external payable {
        require(msg.value > 0, "O valor do depósito deve ser maior que 0");

        // Atualiza o saldo do usuário
        saldos[msg.sender] += msg.value;

        // Emite o evento de depósito
        emit Deposito(msg.sender, msg.value);
    }

    // Função para verificar o saldo do usuário
    function consultarSaldo() external view returns (uint256) {
        return saldos[msg.sender];
    }

    // Função para retirar MATIC do contrato
    function retirar(uint256 valor) external {
        require(valor > 0, "O valor da retirada deve ser maior que 0");
        require(saldos[msg.sender] >= valor, "Saldo insuficiente");

        // Atualiza o saldo do usuário
        saldos[msg.sender] -= valor;

        // Transfere o MATIC de volta para o usuário
        (bool sucesso, ) = msg.sender.call{value: valor}("");
        require(sucesso, "Falha na retirada");

        // Emite o evento de retirada
        emit Retirada(msg.sender, valor);
    }

    // Função para retirar todo o saldo do usuário
    function retirarTudo() external {
        uint256 saldo = saldos[msg.sender];
        require(saldo > 0, "Nenhum saldo para retirar");

        // Zera o saldo do usuário
        saldos[msg.sender] = 0;

        // Transfere o MATIC de volta para o usuário
        (bool sucesso, ) = msg.sender.call{value: saldo}("");
        require(sucesso, "Falha na retirada");

        // Emite o evento de retirada
        emit Retirada(msg.sender, saldo);
    }
}