const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose')
const dotenv = require('dotenv')






dotenv.config()


mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database Connected"))


const mongouri = "mongodb+srv://nikitha_chittaluri:nikitha@cluster0.042kr0f.mongodb.net/T_SignUp?retryWrites=true&w=majority";
const client = new MongoClient(mongouri);

app.get('/usersa/:reserved_user_id',async(req,res)=>{
    try{
        await client.connect();
        const database = client.db('T_SignUp')
        const collection = database.collection('users')
        const query = await collection.insertOne({
            userName : "nick",
            password : "John",
            email : "nich.ch@gmail.com",
            is_host : false
        });

        res.status(200).json({awesome:'yes'});
    }
    catch(error)
    {
        throw error;
    }
    finally{
        await client.close();
        console.log('all is done');
    }
})

const propertyRouter = require('./routes/properties');
const reservationsRouter = require('./routes/reservations');
const userssRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews')
const ratingRouter = require('./routes/ratings')
const favouriteRouter = require('./routes/favourites')



//app.use(cors());
app.use(express.json());
//const cors = require('cors');
/*
const corsOptions ={
    origin:'http://127.0.0.1:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
*/


//app.use(cors);
/*
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

*/

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/properties', propertyRouter);
app.use('/reservations', reservationsRouter);
app.use('/users', userssRouter);
app.use('/reviews',reviewsRouter);
app.use('/ratings',ratingRouter);
app.use('/favourites',favouriteRouter);


//app.use(express.json())
//app.use(cors())
//app.use('/app', routesURLs)
app.listen(4000, () => console.log("server is up and running"))



