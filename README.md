### Comandos
- yarn init -y
- yarn add express
- yarn add nodemon -D (-D significa que esta dependencia vai ficar como desenvolvimento)
- adicionando o script no package.json
- "scripts": {
-  "dev": "nodemon src/index.js"
- },
- yarn dev

### Tipo de parametros

- Route Params -> Identificar um recurso editar/deletar/busca
- Query Params -> Paginação/ Filtro
- Body Params -> Os objetos inserção/alteracao (json) exemplo: enviar dados para cadastro

### Middlewares

- São funções que ficam entre os request e response
- Ex: usados para validar tokens
- Ex: validar usuarios

### Exemplo
### Requisitos

-[x] Deve ser possivel criar uma conta
-[x] Deve ser possivel buscar o extrato bancario do cliente
-[x] Deve ser possivel realizar um deposito
-[x] Deve ser possivel realizar um saque
-[] Deve ser possivel buscar o extrato bancario do cliente por data
-[] Deve ser possivel atualizar dados da conta do cliente
-[] Deve ser possivel obter dados da conta do cliente
-[] Deve ser possivel deletar uma conta

### Regras de negocio

-[x] Não deve ser possivel cadastrar uma conta com CPF já existente
-[x] Não deve ser possivel buscar extrato em uma conta não existente
-[x] Não deve ser possivel fazer deposito em uma conta não existente
-[x] Não deve ser possivel fazer um saque em uma conta não existente
-[x] Não deve ser possivel fazer saque quando o saldo for insulficiente
-[] Não deve ser possivel excluir um conta não existente
