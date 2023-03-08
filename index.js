let express = require('express')
let app = express();
let cors = require('cors')
let Mongo = require('mongodb');
let dotenv = require('dotenv');
let bodyParser = require('body-parser');
dotenv.config()
let MongoClint = Mongo.MongoClient;
let MongoUrl = "mongodb+srv://YamanayyaG:Yama1234@cluster0.xaxusar.mongodb.net/FlipkartApi?retryWrites=true&w=majority"
let Port = process.env.PORT || 9000
let db;

///mid layers
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/dress',(req,res)=>{
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Dress').find(query).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})
app.get('/Electronics', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Electronic').find(query).toArray((err, data) => {
        if (err) console.log('error while connecting collection')
        res.send(data)
    })
})

app.get('/grocery', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('grocery').find(query).toArray((err, data) => {
        if (err) console.log('error con collection')
        res.send(data)
    })
})
app.get('/Sports', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Sports').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/WeddingGifts', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('WeddingGifts').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})


app.get('/Furniture', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Furniture').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Products', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Products').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.get('/Kitchen', (req, res) => {
    let query ={}
    let id=Number(req.query.id)
    if(id){
     query={product_id:id}
    }
    db.collection('Kitchen').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.post('/Placeorder',(req,res)=>{
   db.collection('orders').insertOne(req.body ,(err,data)=>{
    if (err) throw err;
    res.send('Order placed success')
   })
})
app.get('/Filter/:Proid', (req, res) => {
let query={}
let Proid=Number(req.params.Proid)
let lcost =Number(req.query.lcost)
let hcost=Number(req.query.hcost)
if(lcost && hcost){
    query={
        "product_id":Proid,
        $and:[{cost:{$gt:lcost,$lt:hcost}}]
    }
}
})
// app.get('/kitchenDetiles', (req, res) => {
//    let query ={}
//    let id=Number(req.query.id)
//    if(id){
//     query={product_id:id}
//    }
//     db.collection('kitchenDetiles').find(query).toArray((err, data) => {
//         if (err) throw err;
//         res.send(data)
//     })
// })
app.post('/ProductList',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('Products').find({product_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})
app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query={email:email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
MongoClint.connect(MongoUrl, { useNewUrlParser: true }, (err, data) => {
    if (err) console.log("error while connecting db")
    db = data.db('FlipkartApi')
    app.listen(Port, () => {
        console.log(`Server started on ${Port}`)
    })
})
