import { createSlice } from "@reduxjs/toolkit"
import TaskService from '../../service/TaskService';


interface user {
    user: string,
    token: string,
    isAuthenticated: boolean ,
    axio: boolean

  }
  const axios = ()=>{
    return TaskService.configAxio()
}
 
  // Define the initial state using that type
  const initialState: user = {
    user: null,
    token : null,
    isAuthenticated: localStorage.getItem('isAuthenticated') ? true : false,
    axio: axios()
}
//localStorage.getItem('token') ? true : false




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { usuario, access_token } = action.payload
            state.user = usuario
            state.token = access_token
            state.isAuthenticated = true
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('token')
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer


export const selectCurrentUser = (state) => state.appUser.user
export const selectCurrentToken = (state) => state.appUser.token
export const selectisAuthenticated = (state) => state.appUser.isAuthenticated