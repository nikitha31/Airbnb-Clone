const router = require('express').Router();
let User = require('../models/user.model');
//db.users.find();
const {MongoClient} = require('mongodb');

const mongouri = "mongodb+srv://nikitha_chittaluri:nikitha@cluster0.042kr0f.mongodb.net/T_SignUp?retryWrites=true&w=majority";
const client = new MongoClient(mongouri);
client.connect();
const database = client.db('T_SignUp')
const collection = database.collection('users')
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth.js');



//getting all users
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

//adding a user
router.route('/add').post((req,res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const is_host = Boolean(req.body.is_host);
    const newUser = new User({
        userName,
        password,
        email,    
        is_host
    });

    newUser.save()
         .then(()=>res.json('User Added'))
         .catch(err => res.status(400).json('Errror: '+ err));
});

//delete an existing user
router.route('/:user_id').get((req,res)=>{
    User.findByIdAndDelete(req.params.user_id)
        .then(()=>res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update an existing user
router.route('/updateUser/:user_id').post((req,res) =>{
    User.findById(req.params.user_id)
    .then(user=> {
        user.password = req.body.password;
        user.email = req.body.email;
        user.is_host = Boolean(req.body.is_host);
        
        user.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});

//update isHost
router.route('/updateUserAsHost/:user_id').post((req,res) =>{
    User.findById(req.params.user_id)
    .then(user=> {
        user.password = user.password;
        user.email = user.email;
        user.is_host = true;
        
        user.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});


//protected route
router.get('/welcome', auth, function(req, res) {
	res.json({ message: "Welcome!!" } );

});


const {registerUser, loginUser} = require('../UserCont')
router.post('/login', loginUser)
router.post('/register', registerUser)


module.exports = router;





