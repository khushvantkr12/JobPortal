import {Job} from "../models/job.model.js";

export const postJob=async (req,res)=> {
    try{
     const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
     const userId=req.id;

     if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId){
        return res.status(400).json({
            message:"something is missing",
            success:false
            });
     }
     const job=await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
     })

     return res.status(201).json({
        message:"new job created successfully",
        success:true,
        job
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"Job not created",
      }) 
    }
}
//Get all Jobs by adding filter-->student ke liye
export const getAllJobs=async (req,res)=> {
    try{
      //we can add filter by using search keyword
      const keyword=req.query.keyword || "";
      const query= {
        $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
        ]
      };
      const jobs=await Job.find(query).populate({
        path:"company"
      }).sort({createdAt:-1});
      
      if(!jobs){
        return res.status(400).json({
            message:"job not found",
            success:false
            });
      }
      return res.status(201).json({
        success:true,
        jobs
    })


    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"not get all jobs",
      }) 
    }
}
//Get job by Id-->student ke liye
export const getJobById=async (req,res)=> {
    try{
     const jobId=req.params.id;
     const job=await Job.findById(jobId).populate({
       path:"applications",
       
     });
     if(!job){
        return res.status(400).json({
            message:"jobs not found",
            success:false
            });
     }

     return res.status(201).json({
        success:true,
        job
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"not get all job",
      }) 
    }
}
//admin kitne job create kara hai abhi tk
export const getAdminJobs=async (req,res)=> {
    try{
     const adminId=req.id;
     const jobs=await Job.find({created_by:adminId}).populate({
       path:'company',
       createdAt:-1
     });
     if(!jobs){
        return res.status(400).json({
            message:"jobs not found",
            success:false
            });
     }
     return res.status(201).json({
        success:true,
        jobs
    })



    }catch{
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"",
      }) 
    }
}
