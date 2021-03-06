const express = require ('express');
const cors = require('cors');  
const app = express ( );


const Home = require('./models/Home');
const Orcamento = require('./models/Orcamento');
const port = process.env.PORT || 8080;
app.use(express.json());

//Abaixo está as permições de requizições de acesso ao back-end conforme a documentação do CORS
app.use((req,res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
})


app.get('/', function (req, res){
    res.send("olá, aplição rodando...")
});


app.get( '/home', async (req, res)=> {    
    await Home.findOne()
    .then((home) =>{
      return res.json({
        erro: false,
        dados: home
      });
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum registro encontrado"
      });
    });
  } );


app.post('/cad_orcamento',async (req, res)=>{
    await Orcamento.create(req.body)
    .then(()=>{
      return res.json({
        erro: false,
        mensagem: "Orçamento enviado com sucesso!"
      });
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Orçamento não enviado com sucesso!"
      });
    });
});

//Criando um Orçamento no banco de dados
app.post('/cadastrar',async (req, res)=>{

 /* await sleep(3000);
  function sleep(ms){
    return new Promise((resolve)=>{
      setTimeout(resolve, ms);
    });
  }*/

  await Home.create(req.body)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Orçamento enviado com sucesso!"
    });
  }).catch(()=>{
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Orçamento não enviado com sucesso!"
    });
  });
});


app.get('/orcamentos', async (req, res)=>{
  await Orcamento.findAll({
    attributes: ['id', 'nome', 'telefone', 'email', 'projeto'],
    order: [['id', 'DESC']]
  })
  .then((dados)=>{
    return res.json({
      erro: false,
      dados
    }) 
  }).catch(()=>{
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum Orçamento encontrado"
    });
  });
});

app.get("/visu-orcamento/:id", async (req, res) =>{
    const {id} = req.params;
    await Orcamento.findByPk(id)
    .then((dados) =>{
      return res.json({
        erro: false,
        dados
      });
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum Orçamento encontrado"
      });
    })
})

  app.listen(port, () => {
      console.info("Servidor Rodando em http://localhost:8080");
  });

  /*app.listen(process.env.PORT || 8080);*/

  