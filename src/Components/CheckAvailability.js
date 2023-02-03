import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import '../App.css'
import 'react-datepicker/dist/react-datepicker.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css';
import axios from 'axios';
import CardContent from './CardContent';
import dateFormat from 'dateformat';
import Property_Listings from './Property_Listings'
import ReactDOM from 'react-dom'

const CheckAvailability = (props) => {
    const [selectedFromDate, setSelectedFromDate] = useState(null)
    const [selectedToDate, setSelectedToDate] = useState(null)
    const prop_id = props.prop_id;
    const current_user_details = localStorage.getItem('user');
    const current_user_details1 = JSON.parse(current_user_details);
    const user_email = current_user_details1.email;
    const notyf = new Notyf()
    const [props_reserved, setPropsReserved] = useState(null);
    const [flag, setFlag] = useState(null);


const successToast =() => {
    notyf.success("Success! Reservation Made");

}
const errorToast =() => {
    notyf.error("Unable to make a Reservation. Try Again !");
}
const fieldsNeededToast = () => {
    notyf.error("All fields are mandatory");
}

const notAvailable = () => {
    notyf.error("Sorry, this property is already reserved for this dates. Please try some other dates");
}
 
useEffect(() => {
    getReservedData();

  }, []);
    const getReservedData = async () =>{
        const response = await fetch('reservations/getReservationsForThisProp/'+prop_id,{
            method: 'GET'
        })
        const json = await response.json()
        console.log("ress")

       


         setPropsReserved(json);
         setFlag(true);

         console.log(props_reserved)
        console.log(JSON.stringify(json))
        console.log(json.property_name)
        
       
}


    function checkAvailabilityAndBook(prop_id)
    {
        console.log(props_reserved);
        let flag =0 ;
        
            const abc1 = props_reserved&&props_reserved.filter((val)=>{
                // console.log(this.props.search12);
                console.log("bugati")
                console.log(selectedFromDate.toLocaleString())
                
                console.log(val.reservation_start_date)
                console.log(val.reservation_end_date)
                console.log(selectedFromDate >= val.reservation_start_date)
                const s1 = new Date(selectedFromDate.toLocaleString())
                const r1 = new Date( val.reservation_start_date.toLocaleString())
                const r2 = new Date( val.reservation_end_date.toLocaleString())
                console.log(s1);
                console.log(r1);
                console.log(r2);   
                if((s1 >= r1)&&(s1<=r2)){

                    console.log("came here ");
                    flag = 1;
                 }
                
             })
             console.log("abc1")
             console.log(abc1)
             if(flag==0)
             return true;
             else
             return false;
                
    }
function addReservation()
{
    console.log("return")
    const avail = checkAvailabilityAndBook(prop_id)
    console.log("avail"+avail)
    if(avail)
    {

        if(selectedFromDate==''||
    selectedToDate==''  )
    {
        fieldsNeededToast()
    }
    else{
    const formData = new FormData();
    console.log("in form")
    console.log(selectedFromDate)
    console.log(selectedToDate)
    console.log(user_email)
    console.log(prop_id)
    formData.append('user_reserved_id', user_email);
    formData.append('reserved_property_id', prop_id);
    formData.append('reservation_start_date', selectedFromDate);
    formData.append('reservation_end_date', selectedToDate);

    axios.post('/reservations/add', {
        user_reserved_id : user_email,
        reserved_property_id: prop_id,
        reservation_start_date:selectedFromDate,
        reservation_end_date: selectedToDate



    })
         .then(res => {
            console.log(res);
            successToast();
           // ReactDOM.render(<Property_Listings/>, document.getElementById('root'));

         })
         .catch(err => {
            console.log(err);
            errorToast();
         });
        }
    }
    else{
        notAvailable();
    }
    }




    return(
        {props_reserved}&&<div>
            <h2>Make a Reservation</h2>
        <label>Select Start Date </label><DatePicker 
        selected={selectedFromDate} 
        onChange={date => setSelectedFromDate(date)}
        minDate={new Date()}
        dateFormat='MM-dd-yyyy'
        ></DatePicker>
        <label>Select End Date </label><DatePicker 
        selected={selectedToDate} 
        onChange={date => setSelectedToDate(date)}
        minDate={selectedFromDate}
        dateFormat='MM-dd-yyyy'

        ></DatePicker>
        <div></div>
        <br/>
        <Button style={{'backgroundColor' :'orangered' }} onClick={()=> addReservation()}>Book Now</Button>
        </div>
    );
}
export default CheckAvailability