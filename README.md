# smart-contract-deposito-retirada

Este projeto demonstra como implantar e interagir com um smart contract na rede **Polygon** usando o **Truffle**. O contrato é simples e permite armazenar e recuperar uma mensagem.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Truffle](https://trufflesuite.com/) (instalado globalmente)
- [MetaMask](https://metamask.io/) (ou outra carteira Ethereum compatível)

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. **Instale as dependências**:

   ```bash
   npm install @truffle/hdwallet-provider dotenv
   ```

3. **Crie um arquivo `.env`**:

   No diretório raiz do projeto, crie um arquivo `.env` e adicione as seguintes variáveis de ambiente:

   ```
   PRIVATE_KEY=SUA_CHAVE_PRIVADA_AQUI
   POLYGONSCAN_API_KEY=SUA_CHAVE
   ```

   > **Atenção**: Nunca compartilhe sua chave privada. Certifique-se de adicionar `.env` ao seu `.gitignore`.

## Compilando o Contrato

Para compilar o smart contract, abra o terminal no diretório do projeto e execute o seguinte comando:

```bash
truffle compile
```

## Implantando o Contrato na Polygon

Para implantar o contrato na rede Polygon, execute o seguinte comando:

```bash
truffle migrate --network polygon
```

Isso implantará o contrato na rede Polygon e exibirá o endereço do contrato no console.

## Interagindo com o Contrato

Para interagir com o contrato, abra o console do Truffle:

```bash
truffle console --network polygon
```

No console do Truffle, você pode interagir com o contrato usando os seguintes comandos:

```javascript
// Carregar o contrato
const contrato = await MeuContrato.deployed();

// Ler a mensagem
const mensagem = await contrato.getMensagem();
console.log("Mensagem atual:", mensagem);

// Atualizar a mensagem
await contrato.setMensagem("Nova mensagem na Polygon!");
console.log("Mensagem atualizada!");

// Ler a nova mensagem
const novaMensagem = await contrato.getMensagem();
console.log("Nova mensagem:", novaMensagem);
```

## Executando Testes

Para executar os testes, use o seguinte comando:

```bash
truffle test
```

Isso executará os testes definidos no diretório `test` do projeto.

## Estrutura do Projeto

- `contracts/`: Contém os smart contracts.
- `migrations/`: Contém os scripts de migração para implantar os contratos.
- `test/`: Contém os testes para os smart contracts.
- `truffle-config.js`: Configuração do Truffle.

## Contribuição

Se você quiser contribuir para este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionando nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Este README fornece todas as informações necessárias para configurar, compilar, implantar e interagir com o smart contract na Polygon usando Truffle. Se precisar de mais detalhes ou ajustes, é só avisar! 😊