const router = require('express').Router();
const { json } = require('react-router-dom');
let Rating = require('../models/rating.model');

  

router.route('/').get((req, res) => {
    Rating.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: '+ err));
});


//adding a reservation for a particular user_id
router.route('/add').post((req,res)=>{
    const property_id = req.body.property_id;
    const rating = req.body.rating;
   

   const newRating = new Rating({
    property_id,
    rating
   });
   newRating.save()
    .then(()=> res.json('Rating Added'))
    .catch(err => res.status(400).json('Error: '+ err));


});

router.route('/getThisPropRating/:prop_id').get((req, res) => {
    const user_reserved_id_1 = req.params.prop_id;

    Rating.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.property_id ==user_reserved_id_1)))
      
    .catch(err => res.status(400).json('Error: '+ err));
});





module.exports = router;