import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
//const jobsArray=[1,2,3,4,5,6,7,8];

export default function Jobs() {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  //filter laga rhe hai
  
  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        if (searchQuery.includes('to')) {
          // Parse salary range
          const [minSalary, maxSalary] = searchQuery.split(' to ').map((val) => parseInt(val.replace(/,/g, '')));
          return job.salary >= minSalary && job.salary <= maxSalary;
        } else if (!isNaN(parseInt(searchQuery))) {
          // Exact salary match
          return job.salary === parseInt(searchQuery);
        } else {
          // Other filters like location, title, description
          return (
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);
  

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Jobs not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                  key={job._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}