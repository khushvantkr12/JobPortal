//kaon se company me job create horahi hai
import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany= async(req,res)=> {
    try{
      const {companyName}=req.body;
      const file=req.file;
      const fileUri= getDataUri(file);
      const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
      
        
      if(!companyName || !file){
        return res.status(400).json({
            message:"company name and logo is required",
            success:false
            });
      }
      let company=await Company.findOne({name:companyName});
      if(company){
        return res.status(400).json({
            message:"company is already registered",
            success:false
            });
      }
      company=await Company.create({
        name:companyName,
        userId:req.id,
        logo:cloudResponse.secure_url
      })

      return res.status(201).json({
        message:"Company registered successfully",
        success:true,
        company
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"all fields are required",
      }) 
    }
}

//getCompany
export const getCompany=async (req,res)=> {
    try{
        //jo logged in user hoga usne jitni company create ki hai chaiye..pura nhi chaiye
      const userId=req.id;
      const companies=await Company.find({userId});
      if(!companies){
        return res.status(400).json({
            message:"Companies not found",
            success:false
            });
      }
      return res.status(200).json({
        companies,
        success:true,
     })
    }
    catch(error){
        console.log(error);
       
    }
}
//get company by id
export const getCompanyId=async (req,res) => {
    try{
    //req.params.id refers to a way to access a route parameter from the URL of a request. Specifically, req.params is an object containing any parameters passed in the URL path of a request, and id is a placeholder for one of those parameters.
     const companyId=req.params.id;
     const company=await Company.findById(companyId);
     if(!company){
        return res.status(400).json({
            message:"Company not found",
            success:false
            });
      }
     
     return res.status(200).json({
        company,
        success:true,
     })
    
    }catch(error){
 console.log(error);
    }
}
//update company
export const updateCompany=async (req,res)=> {
    try{
      const {name,description,website,location}=req.body;
      //const file=req.file;
      //cloudinary
      // const fileUri= getDataUri(file);
      // const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
      // const logo=cloudResponse.secure_url;


      const updateData={name,description,website,location};
      const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

      if(!company){
        return res.status(400).json({
            message:"Company not found",
            success:false
            });
      }
      return res.status(200).json({
        message:"company information updated",
        success:true,
     })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"company status not updated",
      }) 
    }
}
