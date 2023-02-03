import ReactDOM from 'react-dom'
import { useLogout } from '../AuthorizationHooks/useLogout'

const LogOutButton = () => {
    const {logout}  = useLogout()

    const handleClick = ()=> {
        logout()

    }

    return (
        <div ><button id="dropdownMenuButton" onClick={handleClick} class="btn btn-primary btn-primary-f" type="button"   aria-expanded="false" style={{color:'red', background:'white',fontSize:18}}  >Logout</button></div>

    )

}
export default LogOutButton
