const Sequelize = require('sequelize');
const db = require('./db');

const Orcamento = db.define('orcamentos', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    assunto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    projeto:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Orcamento.sync()
//Orcamento.sync({alter: true})

module.exports = Orcamento;