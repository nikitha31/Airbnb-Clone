import { useAuthContext } from "./useAuthContext"
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        console.log("logged out")
        window.location.reload(false);



    }

    

    return {logout}
}