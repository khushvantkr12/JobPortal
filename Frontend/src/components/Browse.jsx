import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

export default function Browse() {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch=useDispatch();

  //cleanup-->jo search krenge uske baad back to home page pe aayenge to wo search clean hojana chaiye
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  },[])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-20'>
       <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
       <div className='grid grid-cols-3 gap-4'>
         {
            allJobs.map((job,index)=> {
                return (
                  <motion.div
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                   key={index}>
                   <Job key={job._id} job={job}/>
                  </motion.div>
                    
                )
            })
         }
       </div>
      </div>
    </div>
  )
}
