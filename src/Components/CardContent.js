import React, { Fragment } from "react";
//import "../CSS/CardContent.css"
import Card from 'react-bootstrap/Card';
import BookingPopUp from "./BookingPopUp";
import {useState} from 'react'




function CardContent({ property_id , source_data}){
  const {buttonPopUp, setButtonPopup} = useState(false);
   
  function renderAddAProperty(_id)
  {
     // ReactDOM.render(<UpdateProperty1 name={_id}/>, document.getElementById('root'));
  }
    
const append_image =(props) => {
  const abvi = require("../images/"+props);
  return abvi;

}






    return(  
      <Fragment>
        {
      source_data&&source_data.filter(
      (val)=>{
         
         if(val._id==property_id){
             return val
         }
        
     }).map(({property_name,property_city,property_image,property_description,property_rating_average,is_available,property_nightly_fare,_id})=>(
      <Card>
      {console.log(property_image.replace(/\"/g, "")) }

      <Card.Img variant='top' style={{width:'500px', height:'300px', position:'relative'}} src= {append_image(property_image)}/>
    
    <Card.Body>
      <Card.Title>{property_name}, {property_city}</Card.Title>
      <Card.Text>
       {property_description}
      </Card.Text>
      {is_available&&<Card.Text>Is Available : YES</Card.Text>}
      {!is_available&&<Card.Text>Is Available : NO</Card.Text>}

      <Card.Text>
      Nightly Fare: {property_nightly_fare}
      </Card.Text>

      <Card.Footer>
      <button  variant="warning" onClick={()=> setButtonPopup(true)}>Edit</button>    </Card.Footer>
    </Card.Body>
    <BookingPopUp trigger={buttonPopUp}><h3>my popup</h3></BookingPopUp>

  </Card>

    ))
     }
    </Fragment>

    );
  }


export default CardContent;
