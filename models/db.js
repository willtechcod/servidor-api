const Sequelize = require('sequelize');

/*const sequelize = new Sequelize('contato','root','',{
    host: 'localhost',
    dialect: 'mysql'
});*/

const sequelize = new Sequelize('willtech_contato','willtech_willtechcod','skt245186',{
    host: '189.45.192.50',
    dialect: 'mysql'
});


sequelize.authenticate()
.then(() =>{
    console.log("Conexão com banco de dados realizada com sucesso!")
}).catch(() =>{
    console.log("Erro: Conexão com banco de dados não realizada com sucesso!")
})

module.exports = sequelize;