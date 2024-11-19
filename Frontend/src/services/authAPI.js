// import axios from "axios"
// import { USER_API_END_POINT } from "@/utils/constant";
// import toast from "react-hot-toast";
// import { setLoading } from "@/redux/authSlice";




// export function sendOtp(email,navigate){
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {
//             const response = await axios.post(`${USER_API_END_POINT}/sendotp`, {
//                 email,
//                 checkUserPresent: true,
//               })
//             console.log("SENDOTP API RESPONSE............", response)
      
//             console.log(response.data.success)
      
//             if (!response.data.success) {
//               throw new Error(response.data.message)
//             }
      
//             toast.success("OTP Sent Successfully")
//             navigate("/verify-email")
//           } catch (error) {
//             console.log("SENDOTP API ERROR............", error)
//             toast.error(error.response.data.message)
//           }
//           dispatch(setLoading(false))
//           toast.dismiss(toastId)
//         }
//       }


//       export function signUp(
//         fullname,
//         email,
//         phonenumber,
//         password,
//         role,
//         file,
//         otp,
//         navigate
//       ) {
//         return async (dispatch) => {
//           const toastId = toast.loading("Loading...")
//           dispatch(setLoading(true))
//           try {
//             const response = await axios.post(`${USER_API_END_POINT}/register`, {
//                 fullname,
//                 email,
//                 phonenumber,
//                 password,
//                 role,
//                 file,
//                 otp,
//                 navigate
//             })
      
//             console.log("SIGNUP API RESPONSE............", response)
      
//             if (!response.data.success) {
//               throw new Error(response.data.message)
//             }
//             toast.success("Signup Successful")
//             navigate("/login")
//           } catch (error) {
//             console.log("SIGNUP API ERROR............", error)
//             toast.error(error.response.data.message)
            
//           }
//           dispatch(setLoading(false))
//           toast.dismiss(toastId)
//         }
//       }
      
// src/services/authAPI.js
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { setLoading, setUser} from "@/redux/authSlice";


// Action to send OTP

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${USER_API_END_POINT}/sendotp`, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully!");
      navigate("/verify-email");
    } catch (error) {
      console.error("SENDOTP API ERROR:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// Action to sign up
export function signUp(
  fullname,
  email,
  phonenumber,
  password,
  role,
  file,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phonenumber", phonenumber);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("otp", otp);
    

      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SIGNUP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      dispatch(setUser(""));
      //dispatch(setVerification(false));
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
