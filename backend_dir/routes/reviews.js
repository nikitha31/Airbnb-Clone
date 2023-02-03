const router = require('express').Router();
const { json } = require('react-router-dom');
let Review = require('../models/review.model');

  

router.route('/').get((req, res) => {
    Review.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: '+ err));
});


//adding a reservation for a particular user_id
router.route('/add').post((req,res)=>{
    const property_id = req.body.property_id;
    const review = req.body.review;
   

   const newReview = new Review({
    property_id,
    review
   });
   newReview.save()
    .then(()=> res.json('Review Added'))
    .catch(err => res.status(400).json('Error: '+ err));


});

router.route('/getThisPropReview/:prop_id').get((req, res) => {
    const user_reserved_id_1 = req.params.prop_id;

    Review.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.property_id ==user_reserved_id_1)))
      
    .catch(err => res.status(400).json('Error: '+ err));
});



module.exports = router;