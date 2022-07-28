const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

//midleware
app.use(express.json());

const customers = []
/* 
*cpf - string
*name - string
*id - uuid
*statment []
*/

//Middlewares - verificando se existe a conta com cpf
function verifyIfExistsAccountCPF(request, response, next){
    const { cpf } = request.headers;
    //const { cpf } = request.params;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({"error": "Customer not found!"})
    }
    //passa para minha rota que contem
    request.customer = customer;

    return next();
}

//realiza operação de credito e debito da conta
function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit'){
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

//criando a conta
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
   
    //validando se cpf ja esta cadastrado
    const customersAlreadyExists = customers.some(
        (customers) => customers.cpf === cpf
    );
    if(customersAlreadyExists){
        return response.status(400).json({ error: "Customer already exists!"});
    }
    //fim validacao cpf

    //gravando em memoria no objeto customer
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

//app.use(verifyIfExistsAccountCPF); todas minhas rotas abaixo vai passar pelo middleware
//pegando o statement da conta com cpf
app.get("/statement/:cpf", verifyIfExistsAccountCPF, (request, response)=>{  
    const { customer } = request;
    return response.json(customer.statement);
});

//efetuando deposito
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description , amount } = request.body;
    const customer = request.customer;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    };

    customer.statement.push(statementOperation);
    return response.status(201).send();
})

//efetuando saque
app.post("/withdraw", verifyIfExistsAccountCPF,(request, response)=> {
    const { amount } = request.body;
    const { customer } = request;

    //pegando o saldo existente
    const balance = getBalance(customer.statement);
    //validando se o saldo é menor que o valor de saque
    if(balance < amount){
        return response.status(400).json({error: "Insufficient funds!"});
    }

    //passando objeto para const statementOperation
    const statementOperation = {        
        amount,
        created_at: new Date(),
        type: "debit",
    };

    //gravando em memoria 
    customer.statement.push(statementOperation);

    //se ok retorna status 201
    return response.status(201).send();

});

app.listen(3333);
