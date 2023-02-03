const router = require('express').Router();
let Property = require('../models/property.model');
//let User = require('../models/user.modal');



const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../src/images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



//getting all properties
router.route('/').get((req, res) => {
    Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: '+ err));
});

//adding a property
router.route('/add').post(upload.single('property_image'),(req,res) => {
    console.log("came here");
    const property_name = req.body.property_name;
    const property_city = req.body.property_city;
    const property_image = req.file.filename;
    const property_description = req.body.property_description;
    const property_nightly_fare =  req.body.property_nightly_fare;
    const property_owner = req.body.property_owner;
    const is_available = true;
    const is_deleted = false;
    const property_rating_average = 0;

    const newProperty = new Property({
        property_name,
        property_city,
        property_image,    
        property_description,
        property_nightly_fare,
        property_owner,
        is_available,
        is_deleted,
        property_rating_average
    });

    newProperty.save()
         .then(()=>res.json('Property Added'))
         .catch(err => res.status(400).json('Errror: '+ err));
});


//getting one particular property based one property id
router.route('/:property_id').get((req,res)=>{
    Property.findById(req.params.property_id)
        .then(properties=>res.json(properties))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete an existing property
router.route('/del/:property_id').get((req,res)=>{
    Property.findByIdAndDelete(req.params.property_id)
        .then(()=>res.json('Property Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update an existing property
router.route('/updateProperty/:property_id').post((req,res) =>{
    Property.findById(req.params.property_id)
    .then(property=> {
        property.property_name = req.body.property_name;
        property.property_city = req.body.property_city;
        property.property_description = req.body.property_description;
        property.property_rating_average = property.property_rating_average;
        property.property_nightly_fare = req.body.property_nightly_fare;
        property.is_available = req.body.is_available;
        property.property_owner = property.property_owner;
        property.property_image = property.property_image;
        property.is_deleted = property.is_deleted;
        property.property_rating_average = property.property_rating_average;

        property.save()
        .then(() => res.json('Property Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});


//update an existing property
router.route('/updatePropertyRating/:property_id').post((req,res) =>{
    Property.findById(req.params.property_id)
    .then(property=> {
        property.property_name = property.property_name ;
        property.property_city = property.property_city;
        property.property_description =  property.property_description;
        property.property_rating_average = property.property_rating_average;
        property.property_nightly_fare = property.property_nightly_fare;
        property.is_available = property.is_available ;
        property.property_owner = property.property_owner;
        property.property_image = property.property_image;
        property.is_deleted = property.is_deleted;
        property.property_rating_average = (property.property_rating_average + Number(req.body.property_rating_average) )/2;


        property.save()
        .then(() => res.json('Property Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});

//Soft delete an existing property
router.route('/softDelete/:property_id').post((req,res) =>{
    Property.findById(req.params.property_id)
    .then(property=> {
        property.property_name = property.property_name ;
        property.property_city = property.property_city;
        property.property_description = property.property_description;
        property.property_rating_average = property.property_rating_average;
        property.property_nightly_fare = property.property_nightly_fare;
        property.property_owner = property.property_owner;
        property.property_image = property.property_image;
        property.is_deleted =true ;
        property.is_available = false;


        property.save()
        .then(() => res.json('Property Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});




module.exports = router;