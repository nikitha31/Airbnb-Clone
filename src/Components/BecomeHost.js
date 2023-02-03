import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'


const BecomeHost = () => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
        console.log("linkssss")
    })
})
    const [isHost, setIsHost] = useState(false)
    const [user_id, setUserID] = useState("")
     
    const notyf = new Notyf()
    const successToast =() => {
        notyf.success("Success ! You are host now");

    }
    const errorToast =() => {
        notyf.error("Error! Unable to make you host. Please try again");

    }


    console.log('gugu')
    const current_user_details = localStorage.getItem('user');
    console.log(current_user_details);

    const current_user_details1 = JSON.parse(current_user_details);
    console.log(current_user_details1.email);
    const user_email = current_user_details1.email;
 
   console.log("lla la la bheemla")

    const addAProperty = async (e) => {
        e.preventDefault()


    }
    const updateToHost = async (e) => {

        e.preventDefault()
       
        const response = await fetch('/users/updateUserAsHost/'+user_id,{
            method: 'POST'
        })
        const json = await response.json()

        if(!response.ok)
        {
            errorToast();

        }
        if(response.ok)
        {
            console.log('updated');
            successToast();
            window.location.reload(false);




        }

    }



   

       useEffect(() => {
        const getYESORNO = async () =>{
            const response = await fetch('/users/',{
                method: 'GET'
            })
            const json = await response.json()
            console.log(JSON.stringify(json))
    
    
            const abc1 = json  &&json.filter((val)=>{
                // console.log(this.props.search12);
                 
                 const searchEmail =user_email
    
                 if(val.email.toLowerCase().includes(searchEmail.toLowerCase())){
                     return val
                 }
                
             })
             
                console.log(abc1[0])
                console.log(JSON.stringify(abc1));
                const q = JSON.stringify(abc1[0])
                const allDetails = JSON.parse(q)
                
                console.log(allDetails._id)
                console.log(allDetails.email)
                console.log(allDetails.is_host)
                setIsHost(allDetails.is_host)
                setUserID(allDetails._id)
           };
           getYESORNO();
      }, []);

      console.log(isHost);


   
if(isHost)
{
        ReactDOM.render(<a class = "nav-link" >My Properties</a>,document.getElementById("toBeShownOnlyToHostSideBarID"))
        ReactDOM.render(<a class = "nav-link">Add a Property</a>,document.getElementById("toBeShownOnlyToHostSideBarID2"))

    }
     

    
    if(isHost)
    return(<div></div>)
    else
    return (
       <button class="btn btn-primary btn-primary-f becomeHostButtonClass" onClick={updateToHost} type="button" id="dropdownMenuButton"  aria-expanded="false" style={{fontSize:18,background:'white',color:'red'}} >Become a Host</button>

    )

}
export default BecomeHost
