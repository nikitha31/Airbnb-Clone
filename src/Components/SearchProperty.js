import React, {Fragment,useState,useEffect} from 'react'
import "../CSS/Property_Listings.css"
import exportSearch from "../Search";
import ReactDOM from 'react-dom';
import CardContent from './CardContent';
import ReactDOMServer from 'react-dom/server';
import Button from 'react-bootstrap/Button';
import NewCardContent from './NewCardContent';





  function SearchPropert() 
  {
    const [data,setData]=useState([]);
    const abc = document.getElementById("tg").value;
    console.log("asdhuwhdw")
    console.log(abc)
    console.log("dine")
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
          }
          


          const append_image =(props) => {
            const abvi = require("../images/"+props);
            return abvi;
    
        }


    const sendCred=(property_id)=>{
      console.log(property_id);
      document.getElementById("root").innerHTML=  ReactDOMServer.renderToString(<CardContent property_id={property_id} source_data={owned_props}/>);
    };
    function renderAddAProperty(_id)
      {
          ReactDOM.render(<NewCardContent name={_id}/>, document.getElementById('root'));
      }
   
  
    return (
      
        <Fragment>
        <section>
            <div className='row '>
            {
                owned_props  && owned_props.length>0&&owned_props.filter((val)=>{
                  // console.log(this.props.search12);
                    
                    const searchTerm =abc

                    if(searchTerm=="")
                    {
                      console.log("searchTerm")

                      console.log(searchTerm)
                        return val;
                    }
                    else if((val.property_name.toLowerCase().includes(searchTerm.toLowerCase()))&&(val.property_city.toLowerCase().includes(searchTerm.toLowerCase()))){
                      return val
                  }
                   
                })
                .map(({property_name,property_city,property_image,property_description,property_rating_average,is_available,property_nightly_fare,_id})=>(

                    <div class="col-sm-3 col-md-3 pb-2"  >
                        <div class="card card-outline-info">
                        <div className="card-image " >
                                <div className='title'></div>
                                <img src={append_image(property_image)} alt="" />

                            </div>
                            <div className="card-body">
                                <h4>{property_name}</h4> 
                                <h5>{property_city}</h5>
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



  export default SearchPropert;
