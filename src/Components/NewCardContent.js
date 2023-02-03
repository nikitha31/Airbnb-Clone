import React, { useState, useEffect, useLayoutEffect } from 'react';

import  { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { GetServices } from './GetServies';
import CheckAvailability from './CheckAvailability'
import ReactDOM from 'react-dom'
import axios from 'axios';


const NewCardContent = (props) => {
    const flag = false
    const prop_id = props.name
    const [reviews,setReviews] = new useState(null);

    const [owned_props, setOwnedProps] = useState(null);
   
useEffect(() => {
    const getPropData = async () =>{
        const response = await fetch('/properties/'+prop_id,{
            method: 'GET'
        })
        const json = await response.json()
        console.log("ress")

        console.log(JSON.stringify(json))
        console.log(json.property_name)
        
        setOwnedProps(json)
        console.log("owned_props")
            console.log(prop_id)
            console.log(owned_props)
         
      
}
     getPropData();
     GetCustReviews();

  }, []);
    
   
 // setOwnedProps(GetServices);
    const append_image =(props) => {
        const abvi = require("../images/"+props);
        return abvi;

    }
   
     
            console.log("owned_props")
            console.log(prop_id)

            console.log(owned_props)

function renderCheckAvailability(props)
    {
        ReactDOM.render(<CheckAvailability prop_id={props}/>, document.getElementById('root'));
    }
    async function GetCustReviews()
    {
      console.log("re clicked")
      //getThisPropReview
      const response = await fetch('/reviews/getThisPropReview/'+prop_id,{
        method: 'GET'
    })
    const json = await response.json();
  
          setReviews(json);

    
    }
    const current_user_details = localStorage.getItem('user');
console.log(current_user_details);
  
    

const current_user_details1 = JSON.parse(current_user_details);
console.log(current_user_details1.email);
const user_email = current_user_details1.email;

  
      async function addToFavourites()
      {
        //cancelResv
        await axios.post('/favourites/add', {
          property_id : prop_id,
          user_email: user_email
    
        })
             .then(res => {
                console.log(res);
    
             })
             .catch(err => {
                console.log(err);
             });

      }

    return (
        
      owned_props&&<Fragment> 
                <Row xs={1} md={3} className="g-4">
                    {
                <Col>
                   <Card style={{height:'1000px',width:'1000px'}}>
                      {console.log(owned_props.property_image.replace(/\"/g, "")) }

                      <Card.Img variant='top' style={{width:'1000px', height:'500px', position:'relative'}} src= {append_image(owned_props.property_image)}/>
                    
                    <Card.Body>
                      <Card.Title>{owned_props.property_name}, {owned_props.property_city}</Card.Title>
                      <Card.Text>
                       {owned_props.property_description}
                      </Card.Text>
                      {owned_props.is_available&&<Card.Text>Is Available : YES</Card.Text>}
                      {!owned_props.is_available&&<Card.Text>Is Available : NO</Card.Text>}

                      <Card.Text>
                      {owned_props.property_rating_average}  <span class="fa fa-star checked" style={{'color':'orange'}}></span><div></div>

                      </Card.Text>

                      <Card.Footer style={{'backgroundColor':'white'}}>
                      <Button class='card-footer'  style={{'color':'white','backgroundColor':'orangered','alignContent':'right'}} onClick={()=> renderCheckAvailability(owned_props._id)}>Book Now for {owned_props.property_nightly_fare}$night</Button> <Button variant="warning" onClick={()=>addToFavourites()} >Add to Favourites</Button> 
                      </Card.Footer>
                      <Card.Title>
                        Customer Reviews
                      </Card.Title>
                      {reviews&&reviews.filter((val)=>{
                                                return val;

                      })
                      .map((review)=>(

                      <div>
                      
                      <Card.Body>
                        <Card.Footer>{review.review}</Card.Footer>
                      </Card.Body>
                      </div>
                      ))}
                    </Card.Body>
                    
                  </Card>
                  </Col>

            }
              </Row>
            
             
        </Fragment>

        
      );
}

export default NewCardContent;
