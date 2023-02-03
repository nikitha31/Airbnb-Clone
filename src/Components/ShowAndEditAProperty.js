import React, { Fragment,useState, useEffect } from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import Button from 'react-bootstrap/Button';
import {Link, Router} from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UpdateProperty1 from './UpdateProperty1';
import DeleteProperty from './DeleteProperty';
import ReactDOM from 'react-dom'


const ShowAndEditAProperty = () => 
{

    const [isHost, setIsHost] = useState(false)
    const [user_id, setUserID] = useState("")
    const [owned_props, setOwnedProps] = useState(null);
    const [prop_img, setPropImage] = useState(null);

    const notyf = new Notyf()
    const successToast =() => {
        notyf.success("Success ! You are host now");

    }
    const errorToast =() => {
        notyf.error("Error! Unable to make you host. Please try again");

    }

    const append_image =(props) => {
        const abvi = require("../images/"+props);
        return abvi;

    }
    console.log("ahusidw")
    const aguuid = "uuhiia";



    const current_user_details = localStorage.getItem('user');
    console.log(current_user_details);

    const current_user_details1 = JSON.parse(current_user_details);
    console.log(current_user_details1.email);
    const user_email = current_user_details1.email;

    useEffect(() => {
        const getAllPropsOWN = async () =>{
            const response = await fetch('/properties/',{
                method: 'GET'
            })
            const json = await response.json()
            console.log(JSON.stringify(json))
    
    
            const abc1 = json  &&json.filter((val)=>{
                // console.log(this.props.search12);
                 
                 const searchEmail =user_email
    
                 if(val.property_owner.toLowerCase().includes(searchEmail.toLowerCase())&&!val.is_deleted){
                     return val
                 }
                
             })
                console.log("own props")
                console.log(abc1[0])
                console.log(JSON.stringify(abc1));
                const q = JSON.stringify(abc1[0])
                const allDetails = JSON.parse(q)
                
                console.log(allDetails._id)
                console.log(allDetails.email)
                console.log(allDetails.is_host)
                
                setOwnedProps(abc1);
           };
           getAllPropsOWN();
      }, []);


      function renderAddAProperty(_id)
      {
          ReactDOM.render(<UpdateProperty1 name={_id}/>, document.getElementById('root'));
      }

      function renderDeleteProperty(_id)
      {
        ReactDOM.render(<DeleteProperty name={_id}/>, document.getElementById('root'));
      }
      


     

    return (
        <Fragment>
        
               
                <Row xs={1} md={3} className="g-4">
                    {
            owned_props&&owned_props.filter((val)=>{
                const searchEmail =user_email
    
                if(val.property_owner.toLowerCase().includes(searchEmail.toLowerCase())&&!val.is_deleted){
                    return val
                }      
             }).map(({_id,property_name,property_city,property_image,property_description,property_nightly_fare,is_available})=>(
                <Col>
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
                      <Button class='card-footer' variant="warning" onClick={()=> renderAddAProperty(_id)}>Edit</Button> <Button variant='danger' onClick={()=> renderDeleteProperty(_id)}>Delete</Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                  </Col>

                ))
            }
              </Row>
            
             
        </Fragment>

        
      );
}

export default ShowAndEditAProperty;
