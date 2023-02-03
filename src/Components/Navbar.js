import ReactDOM from 'react-dom'
import { useLogout } from '../AuthorizationHooks/useLogout'

const Navbar = () => {
    const {logout}  = useLogout()

    const handleClick = ()=> {
        logout()

    }

    return (
        <nav class="navbar navbar-light bg-light justify-content-between navbar-expand-lg fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand">                
          <img src="/Users/Nikitha/Documents/WPL_Project/airbnb/public/images/airbnb_logo.png" width="102" height="80"  alt=""/>

          </a>
    
          <div class="text-center mx-auto"> 
               
                <div id="search_id"></div>

          </div>
    
          <div style='Padding-right: 20px;'><button class="btn btn-primary btn-primary-f" type="button" id="dropdownMenuButton"  aria-expanded="false" style='font-size:18px;background-color:white;color:red' >Become a Host</button></div>
          <div style='Padding-right: 20px;'> <a href="#" class="favourite"  style='font-size:18px;background-color:white; '><i class="fa fa-heart-o" style="font-size:24px;color:red"></i>  </a> </div>
          <div style='Padding-right: 20px;'><button id="logout" class="btn btn-primary btn-primary-f" type="button" id="dropdownMenuButton"  aria-expanded="false" style='font-size:18px;background-color:white;color:red' >Logout</button></div>

          </div>      
      </nav>
    )

}

export default Navbar;