// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SaqueRetirada {
    // Mapeamento para armazenar o saldo de cada usuário
    mapping(address => uint256) public balances;

    // Eventos para registrar depósitos e retiradas
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    // Função para depositar MATIC no contrato
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");

        // Atualiza o saldo do usuário
        balances[msg.sender] += msg.value;

        // Emite o evento de depósito
        emit Deposit(msg.sender, msg.value);
    }

    // Função para verificar o saldo do usuário
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // Função para retirar MATIC do contrato
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Atualiza o saldo do usuário
        balances[msg.sender] -= amount;

        // Transfere o MATIC de volta para o usuário
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");

        // Emite o evento de retirada
        emit Withdrawal(msg.sender, amount);
    }

    // Função para retirar todo o saldo do usuário
    function withdrawAll() external {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No balance to withdraw");

        // Zera o saldo do usuário
        balances[msg.sender] = 0;

        // Transfere o MATIC de volta para o usuário
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Withdrawal failed");

        // Emite o evento de retirada
        emit Withdrawal(msg.sender, balance);
    }
}