import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../mail/template/emailVerificationTemplate.js"


const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 120,
    }
})

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email,
             "Verification EMAIL from Job-Portal by-khushvant kumar",
             emailTemplate(otp));
        //console.log("Email sended Successfully!! => ", mailResponse);
    } catch(error) {
        // console.error(error);
        console.log("error while SENDING.. EMAIL", error);
        throw error;
    }
}


OTPSchema.pre("save", async function(next) {
    // Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
} )

export const OTP=mongoose.model('OTP',OTPSchema);