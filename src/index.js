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

app.get("/statement/:cpf", (request, response)=>{
    const { cpf } = request.params;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({"error": "Customer not found!"})
    }

    return response.json(customer.statement);
});

app.listen(3333);
