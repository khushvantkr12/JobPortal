import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJobs=async (req,res)=> {
    try{
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                success:false
                });
        }
   //check if user has already applied for job
   const existingApplication=await Application.findOne({job:jobId,applicant:userId});//jobid aur userid dono match hona chaiye

 if(existingApplication){
    return res.status(400).json({
        message:"you have already applied for this job",
        success:false
        });
 }
   //check if job exist or not
   const job=await Job.findById(jobId);
   if(!job){
    return res.status(400).json({
        message:"job not found",
        success:false
        });
   }
   //create a new application
   const newApplication=await Application.create({
     job:jobId,
     applicant:userId
   })
   //jitna bhi user apply krega usko application ke aandar push karenge
   job.applications.push(newApplication._id);
   await job.save();
   
   return res.status(201).json({
    message:"Congratulations!!! your job is submitted successfully",
    success:true,
    
})


    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"can't able to apply",
      }) 
    }
}
//getJobs
export const getAppliedJobs=async (req,res)=> {
    try{
    const userId=req.id;
    //hm find kar rhe hai jitne bhi user us job ko apply kiye hai
    const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}},
        }
    });
    if(!application){
        return res.status(400).json({
            message:"No Applications",
            success:false
            });
    }
    return res.status(200).json({
        application,
        success:true
    
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"kuch garbar hai",
        }) 
    }
}
//suppose admin ne job post kri..to wo ye dekhega ki iss wale post pe kitne log ne apply kara hai
export const getApplicants=async (req,res) => {
    try{
    const jobId=req.params.id;
    const job=await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant',
            options:{sort:{createdAt:-1}},
        }
    });
    if(!job){
        return res.status(400).json({
            message:"job not found",
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
            message:"error aagya bhai",
        }) 
    }
}
//update status:accepted hua,rejected hua
export const updateStatus=async(req,res)=> {
    try{
    const {status}=req.body;
    //kon se applicants ka status change kar rhe ho...
    const applicationId=req.params.id;
    if(!status){
        return res.status(400).json({
            message:"status is required",
            success:false
            });
    }
    //find the application by applicant id
    const application=await Application.findOne({_id:applicationId});
    if(!application){
        return res.status(400).json({
            message:"application not found",
            success:false
            });
    }
  //update the status
  application.status=status.toLowerCase();
  //save applications in database
  await application.save();

  return res.status(201).json({
    message:"Status Updated Successfully",
    success:true,
    
})


    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"status not get",
      }) 
    }
}