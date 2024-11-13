import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import otpGenerator from "otp-generator";
import { OTP } from "../models/OTP.model.js";

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    //validate
    if (checkUserPresent) {
      return res.status(401).json({
        sucess: false,
        message: "User Already Exists",
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpBody = await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      message: "OTP Sended SUCCESSFULLY !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user not register..try again!!!",
    });
  }
};

export const register = async (req, res) => {
  try {
    //extract from body
    const { fullname, email, phonenumber, password, role, otp } = req.body;
    const file = req.file;
    //console.log(req.file);
    //check for not anything empty
    if (
      !fullname ||
      !email ||
      !phonenumber ||
      !password ||
      !role ||
      !file ||
      !otp
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //getdataUri se file lenge
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //check user already exist for same email or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }
    //otp ko find krenge mail ke aadhar pe
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP you entered is wrong !!",
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user not register..try again!!!",
    });
  }
};
//login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //check for not anything empty
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    //console.log(user);
    //agar wo email nhi mila database me to incorrect email hoga
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //matching password
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    //check role is correct or not...mtlb agar koi banda register kiya hai as a student aur wo login kar rha hai as a recruiter,,to error aayega
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesnot exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user not logged in..try again!!!",
    });
  }
};
//logout
export const logout = async (req, res) => {
  try {
    //logout kb hoga jb pura cookie ko 0 kr denge..
    return res.status(201).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user not logout",
    });
  }
};
//update profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    //console.log(fullname,email,phonenumber,bio,skills);
    const file = req.file;

    if (!bio || !file || !skills) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    //cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //convert string 'skills' into array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middle authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    //updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume comes later when we setup cloudinary
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinay url
      user.profile.resumeOriginalName = file.originalname; //save the original name
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "profile not updated",
    });
  }
};
