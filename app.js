const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
let connection = "mongodb://ajith:denizisasideman@cluster0-shard-00-00-iaeoe.mongodb.net:27017,cluster0-shard-00-01-iaeoe.mongodb.net:27017,cluster0-shard-00-02-iaeoe.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    db.collection('quotes').find().toArray((err, result) => {
        res.render(__dirname+'/public/views/index.ejs', {quotes: result})
      })
  
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
})

app.listen(8080, function(){
    console.log("Listening on port 8080...")
})



MongoClient.connect(connection, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 27017...')
  })
})


