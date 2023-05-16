import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectisAuthenticated } from "../redux/features/authSlice"



const PrivateRoutes = () => {

    let auth = useSelector(selectisAuthenticated)

    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes