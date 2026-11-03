/**
 * Abra um novo terminal para instalar um novo projeto para criar o arquivo package.json
 * com as dependencias de projeto com o seguinte comando npm:
 * 
 *      npm init -y
 *
 * agora vamos instalar os pacotes (express, mysql2 e body-parser)
 * para importarmos as bibliotecas para as dependencias do servidor "express".
 * da conexão com o banco de dados "mysql2" e o conversor "body-parser"
 * para pegarmos as informações do formulário html
 * 
 *      npm i express mysql2 body-parser
 * 
 */

//importando os pacotes

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

//necessário para passar alguns caminhos de arquivos estáticos
const path = require('path');

const app = express();

//criando uma porta de rede acesso ao servidor
const port = 3000;

//para trabalhar com arquivos estáticos como o .css, por exemplo
appendFile.use(express.static(path.join(__dinarme, 'public')));

//configurando a conexão com o banco de dados
const connection = mysql.createConnection(
{
    host: '127.0.0.1',
    user: 'root',
    password: 'udf2025',
    database: 'aula',
    port: '3306'
});

//conectando o banco de dados
connection.connect( erro =>  {
    if (erro) {
        console.error("Erro ao conectar ao banco dados", erro);
        return;
    }
    console.log("conectado ao banco de dados");
});

//configurando com body-parser (é um middleware para Node.js que naalisa requisições de formulários HTTP, req, post e put)
app.use(bodyParser.urlencoded( {extended: true}));

//servir o formulário html para trabalhar com arquivo estático
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

//postagem dos dados digitados no formulário
//(inserirCliente) para o BD
app.post('/inserirCliente', (req, res) =>{
    //o que estiver vindo do corpo da página o atributo req captura
    const {nome, email, telefone, endereco} = req.body;
    //constante sql com atributo da documentação do mysql para usar a procedure
    const sql = 'CALL inserirCliente(?, ?, ?, ?)';
    //passando (desestruturando os dados) para o BD a consulta SQL de inserção dos dados
    connection.query(sql, [nome, email, telefone, endereco], (err, results) => {
        if (err) {
            console.error('Erro ao inserir cliente', err);
            res.send('Erro ao inserir cliente.');
            return;
        }
        res.redirect('/?mensagem=sucesso');
    });
});

//inicializar o servidor com a url padrão localhost
app.listen(port, ()=>{console.log(`Servidor rodando em http://localhost: ${port}`)});

//para executar a aplicação CRUD, digite no prompt do terminal: node server.js e clique na url http://localhost:3000
//insira dados do cliente no formulário html e verifique no DB (select * from cliente) no mySQL Workbench se os dados foram
//persistidos na tabela cliente