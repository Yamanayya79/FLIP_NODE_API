let express = require('express')
let app = express();
let cors = require('cors')
let Mongo = require('mongodb');
let dotenv = require('dotenv');
let bodyParser = require('body-parser');
dotenv.config()
let MongoClint = Mongo.MongoClient;
let MongoUrl = "mongodb+srv://YamanayyaBG:Yama1234@flip-kart.gvmpppq.mongodb.net/Flip-kart?retryWrites=true&w=majority"
let Port = process.env.PORT || 9000
let db;

///mid layers
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
        res.send("WEL COME TO FLIPKART NODE API")
    })


app.get('/dress',(req,res)=>{
    db.collection('Dress').find().toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})
app.get('/Electronics', (req, res) => {
    db.collection('Electronics').find().toArray((err, data) => {
        if (err) console.log('error while connecting collection')
        res.send(data)
    })
})

app.get('/grocery', (req, res) => {
    db.collection('grocery').find().toArray((err, data) => {
        if (err) console.log('error con collection')
        res.send(data)
    })
})
app.get('/Sports', (req, res) => {
    db.collection('Sports').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/WeddingGifts', (req, res) => {
    db.collection('WeddingGifts').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Products', (req, res) => {
    db.collection('Products').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Furniture', (req, res) => {
    db.collection('Furniture').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Furniture', (req, res) => {
    db.collection('Furniture').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/FProducts', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={producttype_id:id}
    }
    db.collection('FProducts').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.get('/Kitchen', (req, res) => {
    db.collection('Kitchen').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/kitchenDetiles', (req, res) => {
   let query ={}
   let id=Number(req.query.id)
   if(id){
    query={producttype_id:id}
   }
    db.collection('kitchenDetiles').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
MongoClint.connect(MongoUrl, { useNewUrlParser: true }, (err, data) => {
    if (err) console.log("error while connecting db")
    db = data.db('Flip-kart')
    app.listen(Port, () => {
        console.log(`Server started on ${Port}`)
    })
})
