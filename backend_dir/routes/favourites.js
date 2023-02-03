const router = require('express').Router();
const { json } = require('react-router-dom');
let Favourite = require('../models/favourites');

  

router.route('/').get((req, res) => {
    Favourite.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: '+ err));
});


//adding a reservation for a particular user_id
router.route('/add').post((req,res)=>{
    const property_id = req.body.property_id;
    const user_email = req.body.user_email;
   

   const newFavourite = new Favourite({
    property_id,
    user_email
   });
   newFavourite.save()
    .then(()=> res.json('Favourite Added'))
    .catch(err => res.status(400).json('Error: '+ err));


});

router.route('/getThisUsersFavourites/:user_email').get((req, res) => {
    const user_reserved_id_1 = req.params.user_email;

    Favourite.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.user_email ==user_reserved_id_1)))
      
    .catch(err => res.status(400).json('Error: '+ err));
});



//delete a reservation
router.route('/deleteRating/:reservation_id').delete((req,res)=>{
    Favourite.findByIdAndRemove(req.params.reservation_id)
        .then(()=>res.json('Reservation Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getRaingID/:property_id/:user_email').get((req, res) => {
    const user_reserved_id_1 = req.params.user_email;
    const prop_id = req.params.property_id;

    Favourite.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.user_email ==user_reserved_id_1&&obj.property_id == prop_id)))
      
    .catch(err => res.status(400).json('Error: '+ err));
});





module.exports = router;