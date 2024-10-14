import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {JOB_API_END_POINT} from "@/utils/constant";
import { setAllJobs } from '@/redux/jobSlice';

 //jb bhi ye function call hoga tb ye code pura chalega..
const useGetAllJobs =() => {
   const {searchQuery} = useSelector(store=>store.job);
    const dispatch=useDispatch();

    useEffect(()=> {
        const fetchAllJobs=async () => {
            try{
             const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true})
             if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
             }
            }catch(error){
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}
export default useGetAllJobs;
