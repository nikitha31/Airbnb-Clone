import React, { Fragment,useState, useEffect } from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import Button from 'react-bootstrap/Button';
import {Link, Router} from 'react-router-dom';
import {Rating} from 'react-simple-star-rating'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import StarRating from './StarRating'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UpdateProperty1 from './UpdateProperty1';
import DeleteProperty from './DeleteProperty';
import ReactDOM from 'react-dom'
import { keyBy } from 'lodash';



const ShowReservations = () => 
{

    const [reviewGiven, setReviewGiven] = useState('')
    const [reviewGivenToPropID, setReviewResvID] = useState('')
    const [imp, setImp] = useState('');
    
   

    const notyf = new Notyf()
    const successToast =() => {
        notyf.success("Success ! You are host now");

    }
    const errorToast =() => {
        notyf.error("Error! Unable to make you host. Please try again");

    }
    const reviewCantBeEmptyToast =() => {
        notyf.success("Error! Review can't be empty");

    }
    const successToastMessage =(msg) => {
        notyf.success("Success! "+msg);

    }
    const errorToastMessage =(msg) => {
        notyf.error("Error ! "+msg);

    }

    const append_image =(props) => {
        const abvi = require("../images/"+props);
        return abvi;

    }
    console.log("ahusidw")



    const current_user_details = localStorage.getItem('user');
    console.log(current_user_details);

    const current_user_details1 = JSON.parse(current_user_details);
    console.log(current_user_details1.email);
    const user_email = current_user_details1.email;
    let all_data_json;

    //function from stao
  
  // State
  const [tableData, setTableData] = useState([]);

  // Load data when id changes
  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    // Get your data from each source
    const apiData_P = await fetchDataFromAPI_P();
    const apiData_R = await fetchDataFromAPI_R();
    // Key each data set by result ids
    const resultsMappedById_P = keyBy(apiData_P, '_id');
    console.log("resultsMappedById_P")
    console.log(resultsMappedById_P)
    const resultsMappedById_R = keyBy(apiData_R, 'reserved_property_id');
    // Combine data into a single set
    // this assumes your getting same results from each api
    const combinedDataSet = Object.keys(resultsMappedById_P)
      .reduce((acc, key) => {
        // Destructure results together, merging objects
        acc.push({
          ...resultsMappedById_P[key],
          ...resultsMappedById_R[key]
        });
        return acc;
      }, []);
    setTableData(combinedDataSet);
    console.log("tableData");

    console.log(tableData);
  }

  async function fetchDataFromAPI_P() {
    // Fetch your data and return results
    const response = await fetch('/properties/',{
        method: 'GET'
    })
    const json = await response.json()

    console.log("response")

    console.log(json)
    return json

  }

  async function fetchDataFromAPI_R() {
    // Fetch your data and return results
    const response = await fetch('/reservations/',{
        method: 'GET'
    })
    const json = await response.json()

    console.log("response")

    console.log(json)
    return json
  }

   function fetchPropIDFromResvID(id) {
    // Fetch your data and return results
   const response = fetch('/reservations/'+id,{
        method: 'GET'
    })
    .then((response) => response.json())
    .then((oo)=>{return oo.reserved_property_id})
    

    
  }

  
  async function AddReviewToReviewTable(propID, review) {
    // Fetch your data and return results
    if(review=='')
    {
        reviewCantBeEmptyToast();
    }
    else{
       
    await axios.post('/reviews/add/', {
        property_id: propID,
        review: review

    })
         .then(res => {
            console.log(res);
            successToastMessage("Thanks for your feedback");


         })
         .catch(err => {
            console.log(err);
            errorToastMessage("Review cant be added. Please Try Again!");
         });
    }
   
  }



      function renderAddAProperty(_id)
      {
          ReactDOM.render(<UpdateProperty1 name={_id}/>, document.getElementById('root'));
      }

      function renderDeleteProperty(_id)
      {
        ReactDOM.render(<DeleteProperty name={_id}/>, document.getElementById('root'));
      }
      
      function CanCancel(reservation_start_date)
      {
        const current_date = new Date();
        const re_date = new Date(reservation_start_date);
        const r_date = re_date.toLocaleString();
        const c_date = current_date.toLocaleString();
        console.log("diff")
        console.log(r_date);
        console.log(c_date);
        console.log(current_date-re_date)

            const newStartDate= new Date(current_date);
            const newEndDate=new Date(re_date);
            const one_day = 1000*60*60*24;

        let result
    result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
    console.log('date Converter result', result)
    if(result>2)
    {
        return true;
      }
      else{
        return false;
      }

    }
      async function SubmitReview(id)
      {
        const response = fetch('/reservations/'+id,{
            method: 'GET'
        }).then((response) => response.json())
        .then((user) => {
          return user.reserved_property_id;
        });
        const propidd = await response;
        
        console.log("omg"+ propidd)
        const review = document.getElementById(id).value;
        AddReviewToReviewTable(propidd,review); 
        //AddRatingToRatingTable(propidd,rating);


       console.log("rate rate rate"+rating)
    await axios.post('/ratings/add', {
      property_id: propidd,
      rating: rating,

  })
       .then(res => {
          console.log(res);


       })
       .catch(err => {
          console.log(err);
          errorToastMessage("Rating cant be added. Please Try Again!");
       });

       //updatePropertyRating
       console.log(rating+"here here")
       await axios.post('/properties/updatePropertyRating/'+propidd, {
        property_rating_average: rating 
    })
         .then(res => {
            console.log(res);
  
  
         })
         .catch(err => {
            console.log(err);
            errorToastMessage("Rating cant be added. Please Try Again!");
         });

      }

  async function AddRatingToRatingTable(propID, rating) {
    // Fetch your data and return results
    
       
    await axios.post('/ratings/add', {
        property_id: propID,
        rating: rating,

    })
         .then(res => {
            console.log(res);
            successToastMessage("Thanks for your feedback");


         })
         .catch(err => {
            console.log(err);
            errorToastMessage("Rating cant be added. Please Try Again!");
         });
    
   
  }
      function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
      async function CancelReservation(resv_id)
      {
        //cancelResv
        await axios.post('/reservations/cancelResv/'+resv_id, {
            
    
        })
             .then(res => {
                console.log(res);
                successToastMessage("Reservation Cancelled");
                window.location.reload();
    
             })
             .catch(err => {
                console.log(err);
                errorToastMessage("Reservation cant be cancelled. Please Try Again!");
             });

      }
      const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    console.log("rate"+rate)
    setRating(rate)
    // Some logic
  }

     

     

    return (
        <Fragment>
              
              <Row xs={1} md={2} className="g-4">
                    {
            tableData&&tableData.filter((val)=>{
                if(val.user_reserved_id)
                {
                const searchEmail =user_email
    
                if(val.user_reserved_id.toLowerCase().includes(searchEmail.toLowerCase())&&!val.is_cancelled){
                    return val
                }      
            }
             }).map(({_id,property_name,property_city,property_image,property_description,reservation_start_date,reservation_end_date,property_nightly_fare })=>(
                <Col>
                   <Card style={{'width':'30rem', 'height':'40rem'}}>
                      {console.log(property_image.replace(/\"/g, "")) }

                      <Card.Img variant='top' style={{width:'500px', height:'300px', position:'relative'}} src= {append_image(property_image)}/>
                    
                    <Card.Body>
                      <Card.Title>{property_name}, {property_city}</Card.Title>
                      <Card.Text>
                       {property_description}
                      </Card.Text>
                     
                      <Card.Text>
                      Nightly Fare: {property_nightly_fare}$/night <br/>
                      Reservation Start Date: {new Date(reservation_start_date).toLocaleDateString()} <br/>
                      Reservation End Date: {new Date(reservation_end_date).toLocaleDateString()} 
                    
                      </Card.Text>
                      <Card.Text>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={30}
        label
        transition
        fillColor='orange'
        emptyColor='gray'
        className='foo' // Will remove the inline style if applied
      />
      {rating}
      </Card.Text>
                      <Card.Text>
                        <Row>
                            <Form.Control type="text" placeholder="Give Feedback" id={_id} />
                        </Row>
                      </Card.Text>
                      
                      
                     

                      <Card.Footer style={{"backgroundColor":"white"}}>
                        <Row>
                            <Col>
                      <Button variant="info" onClick={()=> SubmitReview(_id)}>Submit Review</Button>
                      </Col><Col>{CanCancel(reservation_end_date)&&<Button variant="danger" onClick={()=> CancelReservation(_id)} style={{}}>Cancel Reservation</Button>}           </Col>
</Row>           </Card.Footer>
                    </Card.Body>
                  </Card>
                  </Col>

                ))
            }
              </Row>
            
        
             
        </Fragment>

        
      );
}

export default ShowReservations;
