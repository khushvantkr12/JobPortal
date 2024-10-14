import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {COMPANY_API_END_POINT} from "@/utils/constant";
import { setCompanies } from '@/redux/companySlice';

 //jb bhi ye function call hoga tb ye code pura chalega..
const useGetAllCompanies =() => {
   
    const dispatch=useDispatch();
    useEffect(()=> {
        const fetchAllCompanies=async () => {
            try{
             const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
             if(res.data.success){
                dispatch(setCompanies(res.data.companies));
             }
            }catch(error){
                console.log(error);
            }
        }
        fetchAllCompanies();
    },[])
}
export default useGetAllCompanies;