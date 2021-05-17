const express = require('express')
const app = express()
const axios = require("axios");
const { response } = require("express");
app.use(express.json())
const port = 5000

const consultaClientes = {};

const funcoes = {
    clienteCriado: (clientes) => {
        //Cliente Criado recebe as informações de cadastro apartir do id selecionado.
        consultaClientes[clientes.id] = clientes;
    },
    ingressosCriado: (ingresso) => {
    const ingressos = consultaClientes[ingresso.ingressoId]["ingressos"] || [];
        ingressos.push(ingresso);
        consultaClientes[ingresso.ingressoId]["ingressos"] = ingressos;
    },
    ClienteAtualizado: (cliente) => {
        const clientes = baseConsulta[cliente]["clientes"];
        const indice = clientes.findIndex((o) => o.id === cliente.id);
        clientes[indice] = cliente;
      },
};

app.get('/clientes', (req, res) => {
    res.status(200).send(consultaClientes);
})

app.post('/eventos', (req, res) => {
    try {
    funcoes[req.body.tipo](req.body.dados);
    } catch (err){}
        res.status(200).send(consultaClientes)
})

app.listen(port, async () => {
  console.log("Consultas. Porta 6000");
  const res = await axios.get("http://localhost:10000.eventos");

  response.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (err) {}
  });
});