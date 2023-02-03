const router = require('express').Router();
const { json } = require('react-router-dom');
let Reservation = require('../models/reservation.model');


/*var monk = require('monk');
var db = monk('localhost:4000/reservations');*/


   // Reservation.find()
   //$([
  /*{"name":"Lenovo Thinkpad 41A4298","website":"google222"},
  {"name":"Lenovo Thinkpad 41A2222","website":"google"}
  ])
    .filter(function (i,n){
        return n.website==='google';
    });*/
   // .then(reservations => {res.json(reservations.reserved_property_id == reserved_property_id_1) })
   // .catch(err => res.status(400).json('Error: '+err));

    //getting all properties
router.route('/getR/:reserved_user_id').get((req, res) => {
    const user_reserved_id_1 = req.params.reserved_user_id;

    Reservation.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.user_reserved_id ==user_reserved_id_1)))
       /* console.log(result);
        var result = JSON.parse(result);
        var result=result.filter(obj=> obj.user_reserved_id == "1");
       
        result => res.json(result)
         })
        */
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/').get((req, res) => {
    Reservation.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/ReservationsOFThisUser/:reserved_user_email').get((req, res) => {
    const user_reserved_id_1 = req.params.reserved_user_email;

    Reservation.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.user_reserved_id ==user_reserved_id_1)))
       /* console.log(result);
        var result = JSON.parse(result);
        var result=result.filter(obj=> obj.user_reserved_id == "1");
       
        result => res.json(result)
         })
        */
    .catch(err => res.status(400).json('Error: '+ err));
});



router.route('/getReservationsForThisProp/:prop_id').get((req, res) => {
    const prop_reserved_id_1 = req.params.prop_id;

    Reservation.find()
    .then(
        properties => res.json(properties.filter(obj=> obj.reserved_property_id ==prop_reserved_id_1)))
       /* console.log(result);
        var result = JSON.parse(result);
        var result=result.filter(obj=> obj.user_reserved_id == "1");
       
        result => res.json(result)
         })
        */
    .catch(err => res.status(400).json('Error: '+ err));
});

    



//adding a reservation for a particular user_id
router.route('/add').post((req,res)=>{
    const user_reserved_id = req.body.user_reserved_id;
    const reserved_property_id = req.body.reserved_property_id;
    const is_cancelled = false;
    const reservation_start_date = req.body.reservation_start_date;
    const reservation_end_date = req.body.reservation_end_date;


   const newReservation = new Reservation({
    user_reserved_id,
    reserved_property_id,
    is_cancelled,
    reservation_start_date,
    reservation_end_date
   

   });
   newReservation.save()
    .then(()=> res.json('Property Added'))
    .catch(err => res.status(400).json('Error: '+ err));


});


//getting one particular reservations based one reservation id
router.route('/:reservation_id').get((req,res)=>{
    Reservation.findById(req.params.reservation_id)
        .then(reservations=>res.json(reservations))
        .catch(err => res.status(400).json('Error: ' + err));
});


//delete a reservation
router.route('/:reservation_id').get((req,res)=>{
    Reservation.findByIdAndDelete(req.params.reservation_id)
        .then(()=>res.json('Reservation Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});



//Soft delete an existing property
router.route('/cancelResv/:resv_id').post((req,res) =>{
    Reservation.findById(req.params.resv_id)
    .then(reservation=> {
        reservation.user_reserved_id = reservation.user_reserved_id;
        reservation.reserved_property_id = reservation.reserved_property_id;
        reservation.is_cancelled = true;
        reservation.reservation_start_date = reservation.reservation_start_date;
        reservation.reservation_end_date = reservation.reservation_end_date;
    


        reservation.save()
        .then(() => res.json('Reservation Updated'))
        .catch(err => res.status(400).json('Error: ' +err ));

    })
    .catch(err => res.status(400).json('Error: ' +err ));
});


module.exports = router;