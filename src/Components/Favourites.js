import ReactDOM from 'react-dom'
import { useState, useEffect, Fragment } from "react";
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import { Button } from 'bootstrap';
import {FaRegHeart, FaHeart} from "react-icons/fa";
import { keyBy } from 'lodash';
import axios from 'axios';




const Favourites = () => {
    
    const current_user_details = localStorage.getItem('user');

    const current_user_details1 = JSON.parse(current_user_details);
    console.log(current_user_details1.email);
    const user_email = current_user_details1.email;
    
    //setUserName(user_email)
    
/*
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
*/
    // State
    
  const [tableData, setTableData] = useState([]);

  // Load data when id changes
  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    // Get your data from each source
    const apiData_F = await fetchDataFromAPI_F();
    const apiData_P = await fetchDataFromAPI_P();
    // Key each data set by result ids
    const resultsMappedById_F = keyBy(apiData_F, 'property_id');
    const resultsMappedById_P = keyBy(apiData_P, '_id');

    console.log("resultsMappedById_P")
    console.log(resultsMappedById_F)
    // Combine data into a single set
    // this assumes your getting same results from each api
    const combinedDataSet = Object.keys(resultsMappedById_F)
      .reduce((acc, key) => {
        // Destructure results together, merging objects
        acc.push({
          ...resultsMappedById_F[key],
          ...resultsMappedById_P[key]
        });
        return acc;
      }, []);
    setTableData(combinedDataSet);
    console.log("tableData");

    console.log(combinedDataSet);
  }

  async function fetchDataFromAPI_F() {
    // Fetch your data and return results
    const response = await fetch('/favourites/getThisUsersFavourites/'+user_email,{
        method: 'GET'
    })
    const json = await response.json()

    console.log("response")

    return json

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




    function getMyFavourites(){
        const append_image =(props) => {
            const abvi = require("../images/"+props);
            return abvi;
    
        }
        async function removeFavourites(property_id,user_email)
        {
            const response = await fetch('/favourites/getRaingID/'+property_id+'/'+user_email,{
                method: 'GET'
            })
            const json = await response.json()
            console.log('fav')
            console.log(json)
            console.log(json[0])
            const ab = json[0];
            console.log(ab);
            console.log(ab._id)
            const f_id = ab._id;
            
            axios.delete('/favourites/deleteRating/'+f_id)
            .then((res) => {
                console.log('Fav successfully deleted!')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
            /*
            const response1 = await fetch('/favourites/deleteRating/'+f_id, {
                method: 'GET'

            })
            console.log(response1);
            */
        }
        ReactDOM.render(<Fragment>

        <section>
            <div className='row '>
            {
                tableData  && tableData.length>0&&tableData.filter((val)=>{
                   // console.log(this.props.search12);
                   return val;
                   
                })
                .map(({property_name,property_city,property_image,property_description,property_rating_average,is_available,property_nightly_fare,_id})=>(
                    <div class="col-sm-3 col-md-3 pb-2" >

                        <div class="card card-outline-info border-0">
                            <div className="card-image">
                                <div className='title'></div>
                                <img src={append_image(property_image)} alt="" />

                            </div>
                            <div className="card-body">
                                <h4>{property_name},{property_city}</h4>           
                                <h6>{property_description}</h6>
                                <h6>{is_available}</h6>
                                <h6>{property_rating_average}  <span class="fa fa-star checked" style={{'color':'orange'}}></span></h6>
                                <span className='nightly_fare'>Now at ${property_nightly_fare}/night</span>
                            </div>
                            <button onClick={()=>removeFavourites(_id,user_email)} class="btn btn-primary btn-primary-f "  type="button" id="dropdownMenuButton"  aria-expanded="false" style={{fontSize:18,background:'white',color:'red'}} > Remove from Favourites<FaHeart/> </button>



                        </div>


                        

                    </div>

                
                 
                ))
            }
            </div>
        </section>

        </Fragment>,
        document.getElementById("root"));


    }

   

return (
    
    <button onClick={()=>getMyFavourites()} class="btn btn-primary btn-primary-f "  type="button" id="dropdownMenuButton"  aria-expanded="false" style={{fontSize:18,background:'white',color:'red'}} > <FaRegHeart/> </button>
    /*
    <div style='Padding-right: 20px;'> 
    <p>j</p>
    <a href="#" class="favourite"  style={{fontSize:"18px",backgroundColor:'white',color:'red'}}>
        <i class="fa fa-heart-o" style="font-size:24px;color:red"></i>  
    </a> </div>
    */

 );




}
export default Favourites