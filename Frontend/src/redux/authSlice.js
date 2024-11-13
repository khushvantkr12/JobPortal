//isme hum "user" ke regarding saari information save karwayenge...
import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        //user ko save karwa rahe hai ki jaise wo login kiya to display me user dikhna chaiye na ki login button..initially null hoga
        user:null,
        isVerified: false,
    },
    reducers:{
        //action
        setLoading:(state,action) => {
         state.loading=action.payload;
        },
        setUser:(state,action) => {
            state.user=action.payload;
           },
           setVerification: (state, action) => {
            state.isVerified = action.payload;
          },
    } 
});
export const {setLoading,setUser,setVerification}=authSlice.actions;
export default authSlice.reducer;