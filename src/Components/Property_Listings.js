import React, {Fragment,useState,useEffect} from 'react'
import "../CSS/Property_Listings.css"
import ReactDOM from 'react-dom'
import search from "../Search"
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CardContent from './CardContent'
import App from '../App'
import ReactDOMServer from 'react-dom/server';
import NewCardContent from './NewCardContent';
import Button from 'react-bootstrap/Button';
import { MDBIcon} from 'mdbreact';


function _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }
function Property() {
    const [data,setData]=useState([]);
    const abc = document.getElementById("tg").value;
    console.log("asdhuwhdw")
    console.log(abc)
    console.log("dine")
    
    const getData=()=>{
      fetch('data.json'
     ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          setData(myJson)
        });
    }

    const [owned_props, setOwnedProps] = useState(null);

useEffect(() => {
    getPropData();

  }, []);
    const getPropData = async () =>{
        const response = await fetch('/properties/',{
            method: 'GET'
        })
        const json = await response.json()
        console.log("ress")

        const abc1 = json  &&json.filter((val)=>{
            // console.log(this.props.search12);
             

             if(val.is_available&&!val.is_deleted){
                 return val
             }
            
         })


         setOwnedProps(abc1);
        console.log(JSON.stringify(json))
        console.log(json.property_name)
        
       
}

  
    const sendCred=(property_id)=>{
        console.log(property_id);
        document.getElementById("root").innerHTML=  ReactDOMServer.renderToString(<CardContent property_id={property_id} source_data={owned_props}/>);
      };

      function renderAddAProperty(_id)
      {
          ReactDOM.render(<NewCardContent name={_id}/>, document.getElementById('root'));
      }

      const append_image =(props) => {
        const abvi = require("../images/"+props);
        return abvi;

    }
   
  
    return (
      

        <Fragment>
            

        <section>
            <div className='row '>
            {
                owned_props  && owned_props.length>0&&owned_props.filter((val)=>{
                   // console.log(this.props.search12);
                    console.log("seacddd");
                    console.log("nnnnow _ prop");
                    const searchTerm =abc

                    if(searchTerm=="")
                    {
                        return val;
                    }
                    else if((val.property_name.toLowerCase().includes(searchTerm.toLowerCase()))&&(val.property_city.toLowerCase().includes(searchTerm.toLowerCase()))){
                        return val
                    }
                   
                })
                .map(({property_name,property_city,property_image,property_description,property_rating_average,is_available,property_nightly_fare,_id})=>(
                    <div class="col-sm-3 col-md-3 pb-2" >

                        <div class="card card-outline-info border-0">
                            <div className="card-image">
                                <div className='title'></div>
                                <img src={append_image(property_image)} alt="" />

                            </div>
                            <div className="card-body">
                                <h4>{property_name}</h4>    <h5>{property_city}</h5>       
                                <h6>{property_description}</h6>
                                <h6>{is_available}</h6>
                                <h6>{property_rating_average}  <span class="fa fa-star checked" style={{'color':'orange'}}></span></h6>
                                <span className='nightly_fare'>Now at ${property_nightly_fare}/night</span>
                            </div>
                            <Button style={{"backgroundColor":"orangered"}} onClick={()=> renderAddAProperty(_id)}>View Details</Button>


                        </div>


                        

                    </div>

                
                 
                ))
            }
            </div>
        </section>

    </Fragment>
    );
  }
  

  export default Property;
/*const property_listing = () => {
    return (
        <Fragment>
            <section className="property_listing">
                <div className='row'>
                      

                    
                    <div className='column'>
                        <div className='property_1'>
                            <div className='card'>
                                <div className="card-image">
                                    <div className='title'></div>
                                    <img src="" alt="" />

                                </div>
                                <div className="card-body">
                                    <h3></h3>
                                    <span className='nightly_fare'></span>
                                </div>

                            </div>
                        </div>
                
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default property_listing
*/