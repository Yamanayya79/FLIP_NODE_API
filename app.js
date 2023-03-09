let express = require('express')
let app = express();
let cors = require('cors')
let Mongo = require('mongodb');
let dotenv = require('dotenv');
let bodyParser = require('body-parser');
dotenv.config()
let MongoClint = Mongo.MongoClient;
let MongoUrl = "mongodb+srv://YamanayyaG:Yama1234@cluster0.xaxusar.mongodb.net/FlipkartApi?retryWrites=true&w=majority"
const db=require('./db')
let Port = process.env.PORT || 9000
let AuthController =require('./controller/authcontroller')
app.use('api/auth',AuthController)
let database;

///mid layers
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/dress', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Dress').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Electronics', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Electronics').find(query).toArray((err, data) => {
        if (err) console.log('error while connecting collection')
        res.send(data)
    })
})

app.get('/grocery', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('grocery').find(query).toArray((err, data) => {
        if (err) console.log('error con collection')
        res.send(data)
    })
})
app.get('/Sports', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Sports').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/WeddingGifts', (req, res) => {
    let query = {}
    let id = Number(req.query.id)

    if (id) {
        query = { product_id: id }
    }
    database.collection('WeddingGifts').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})


app.get('/Furniture', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Furniture').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
app.get('/Products', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Test').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
// app.get('/Products', (req, res) => {
//     let query ={}
//     let id=Number(req.query.id)
//     if(id){
//      query={product_id:id}
//     }
//     db.collection('Products').find(query).toArray((err, data) => {
//         if (err) throw err;
//         res.send(data)
//     })
// })
app.get('/Kitchen', (req, res) => {
    let query = {}
    let id = Number(req.query.id)
    if (id) {
        query = { product_id: id }
    }
    database.collection('Kitchen').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
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
app.post('/Placeorder', (req, res) => {
    database.collection('orders').insert(req.body, (err, data) => {
        if (err) throw err;
        res.send('Order placed success')
    })
})
app.post('/ProductList', (req, res) => {
    if (Array.isArray(req.body.id)) {
        database.collection('Products').find({ product_id: { $in: req.body.id } }).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
        })
    } else {
        res.send('Invalid Input')
    }
})
app.get('/viewOrder', (req, res) => {
    let email = req.query.email;
    let query = {};
    if (email) {
        query = { email: email }
    } else {
        query = {}
    }
    database.collection('orders').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
MongoClint.connect(MongoUrl, { useNewUrlParser: true }, (err, data) => {
    if (err) console.log("error while connecting db")
    database = data.db('FlipkartApi')
    app.listen(Port, () => {
        console.log(`Server started on ${Port}`)
    })
})