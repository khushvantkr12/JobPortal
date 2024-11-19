import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {COMPANY_API_END_POINT} from "@/utils/constant";
import axios from 'axios'
import toast from 'react-hot-toast'
import {setSingleCompany} from '@/redux/companySlice'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


export default function CompanyCreate() {
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState();
    const dispatch=useDispatch();
    const [input,setInput]=useState({
      file:"null"
  })
  const {loading} = useSelector((store)=>store.auth);
   
    const changeFileHandler = (e) => {
      const file=e.target.files?.[0];
      setInput({...input,file});
  }

    const registerNewCompany= async () => {
      if (!companyName || !input.file) {
        toast.error("Company name and logo are required");
        return;
      }
       const formData=new FormData();
       if(input.file){
        formData.append("file",input.file);
       }
       formData.append("companyName", companyName);
        try{
          dispatch(setLoading(true));
          const res=await axios.post(`${COMPANY_API_END_POINT}/register`,formData,{
            headers:{
              'Content-Type': 'multipart/form-data'
            },

            withCredentials:true
          })
        
          if(res?.data?.success){
             dispatch(setSingleCompany(res.data.company));
             toast.success(res.data.message);
             const companyId=res?.data?.company?._id;
             navigate(`/admin/companies/${companyId}`)
          }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }finally {
          dispatch(setLoading(false));
        }
    }

   
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>What would you like to give company name?you can change this later</p>
        </div>
         <Label>
          <Input
           type="text"
           className="my-2"
           placeholder="JobHunt, MicroSoft, etc"
           onChange={(e) => setCompanyName(e.target.value)}
          />
        <div className="my-4">
        <Label className="block font-medium mb-2">Logo</Label>
        <Input
         type="file"
         accept="image/*"
         onChange={changeFileHandler}
         className="w-3/2 p-2 border border-gray-300 rounded-md"
        />
         </div>
           <div className='flex items-center gap-2 my-10'>
           <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>

           {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={registerNewCompany}>
            Continue
            </Button>
          )}

  
           </div>
         </Label>
      </div>
    </div>
  )
}
