import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {  setSearchJobByText } from '@/redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

export default function AdminJobs() {
  useGetAllAdminJobs();
   const navigate=useNavigate();
   const [input,setInput]=useState("");
   const dispatch=useDispatch();

   useEffect(() => {
     dispatch(setSearchJobByText(input));
   },[input]);


  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10 '>
       <div className='flex items-center justify-between my-5'>
         <Input
          className="w-fit"
          placeholder="filter by name,role"
          onChange={(e) => setInput(e.target.value)}
         />
        <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

