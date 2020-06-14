# Mail Server
O Mail Server é um servidor de e-mail desenvolvido com Nodejs e express usando JavaScript.

## Representação do Sistema

Representação do funcionamento de um servidor NodeJs

![Servidor NodeJs](https://tasafo.files.wordpress.com/2015/07/threading_node.png)

> O Node fornece o suporte junto ao Express para desenvolver o serviço de requisição e resposta.

## Tecnologias utilizadas:
### Servidor
- [NodeJs](https://nodejs.org/ "Documentação do NodeJs")

### API
- [ExpressJs](https://expressjs.com/ "Documentação do ExpressJs")

### Modelagem e Banco de Dados
- [MongoDB](https://www.mongodb.com/ "Documentação do MongoDB")
- [Mongoose](https://mongoosejs.com/ "Documentação do Mongoose")

### Autenticação
- [JSON Web Tokens](https://jwt.io/ "Documentação do JSON Web Tokens")


## Procedimento para execução
De acordo com o código abaixo, o servidor executa na porta 8080 do localhost.

```
var server = app.listen(8080, function(){
  console.log('E-mail executando na porta 8080!')
  console.log(config.ambiente)
})
```

Para instalar as dependências da aplicação, execute no seu terminal:
`$ npm install`