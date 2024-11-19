import  { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import axios from 'axios';
import {JOB_API_END_POINT} from "@/utils/constant";
import {APPLICATION_API_END_POINT} from "@/utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function JobDescription() {

   const dispatch=useDispatch();
   const params=useParams();
   const jobId=params.id;
   const {singleJob}=useSelector((store)=>store.job);
   const {user}=useSelector((store)=>store.auth);
   const isIntiallyApplied=singleJob?.applications?.some(application=>application.applicant === user?._id) || false;//some-->koi bhi cheez agar exist krti hai to usko true dega...application ke aandar jo user hai agar uski user._id match hojati hai to true dikhao...
   const [isApplied,setIsApplied]=useState(isIntiallyApplied);

   
  const applyJobHandler =async () => {
     try{
       const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})//withCredentials is used for user authentication
       console.log(res.data);
       if(res.data.success){
        setIsApplied(true);//update local state
        const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]};
        dispatch(setSingleJob(updateSingleJob));//help us to realtime update
         toast.success(res.data.message);
       }
     }catch(error){
      console.log(error);
      toast.error(error.response.data.message);

     }
  }
 //jaise hi hm details pe click kiye to wo job_id wala page open hua then useEffect call hoga..
 useEffect(()=> {
      const fetchSingleJob=async () => {
          try{
            
           const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials: true})
           if(res.data.success){
            dispatch(setSingleJob(res.data.job));
            setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id));//ensure that state is sync with fetched data
           }
          }catch(error){
              console.log(error);
          }
      }
      fetchSingleJob();
  },[jobId,dispatch,user?._id])


  return (
    <div className='max-w-6xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
         <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
         <div className="flex items-center gap-2 mt-4">
         <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} {singleJob?.position === 1 ? 'position' : 'positions'}</Badge>
         <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
         <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary}</Badge>
        </div>
        </div>
         <Button
         onClick={isApplied ? null : applyJobHandler}
           disabled={isApplied}
           className={`rounded-lg ${isApplied ?  'bg-slate-950 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#760a7b]'}`}>{isApplied ? 'Already Applied' : 'Apply Now'}
           </Button>
      </div>
       <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
       <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description} </span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
        <h1 className='font-bold my-1'>salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
       </div>
    </div>
  )
}
