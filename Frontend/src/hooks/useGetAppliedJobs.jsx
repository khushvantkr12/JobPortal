//yaha pe jo student hai na uska applied job show hoga kaha kaha kiya hai
import { setAllAppliedJobs } from "@/redux/jobSlice";
import {APPLICATION_API_END_POINT} from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAppliedJobs = () => {
    const dispatch=useDispatch();

    useEffect(() => {
      const fetchAppliedJobs = async () => {
        try{
          const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
          if(res.data.success){
            //jitna bhi applied jobs hai na usko ek store bna ke push kr denge...
            dispatch(setAllAppliedJobs(res.data.application));//res.data.application---> application backend se laye hai,,aise smjho mere ko application se get karna hai job ko(see application controller line-76)
        
          }
        }catch(error){
          console.log(error);
        }
      }
      fetchAppliedJobs();
    },[])
}
export default useGetAppliedJobs;
//next hmko isko profile page pe call bhi karwana padega..profile pe kyo??kyoki wahi pe mera getapplied job hai na isiliye





