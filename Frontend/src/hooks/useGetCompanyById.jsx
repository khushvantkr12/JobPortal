import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {COMPANY_API_END_POINT} from "@/utils/constant";
import { setSingleCompany } from '@/redux/companySlice';

 //jb bhi ye function call hoga tb ye code pura chalega..
const useGetCompanyById=(companyId) => {
   
    const dispatch=useDispatch();
    useEffect(()=> {
        const fetchSingleCompany=async () => {
            try{
             const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
             if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
             }
            }catch(error){
                console.log(error);
            }
        }
        fetchSingleCompany();
        //useEffect ek baar chalega jb koi bhi changes karenge hm..uske baad jb hm companyId me change karenge tb dobara chalega..
    },[companyId,dispatch])

 }
export default useGetCompanyById;

