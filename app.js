const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
var db

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



MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 27017...')
  })
})


