// import { Label } from "@radix-ui/react-label";
// import Navbar from "../shared/Navbar";
// import { Input } from "../ui/input";
// import { RadioGroup } from "@/components/ui/radio-group";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Loader2 } from "lucide-react";
// import { setLoading, setUser } from "@/redux/authSlice";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { sendOtp } from "@/services/authAPI";

// export default function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phonenumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const navigate = useNavigate();
//   const { loading } = useSelector(store => store.auth);
//   const dispatch = useDispatch();

//   const { fullname,email,phonenumber,password,role,file} = input;

//   const changeEventHandler = (e) => {
//     setInput((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };
  
//   const submitHandler=(e) => {
//     e.preventDefault()
//     const user = {
//     ...input
//      }
//   dispatch(setUser(user));
//     // Send OTP to user for verification
//   dispatch(sendOtp(input.email, navigate))

//   setInput({
//     fullname: "",
//     email: "",
//     phonenumber: "",
//     password: "",
//     role: "",
//     file: "",
//   })
//   }
//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5">Sign Up</h1>

//           {/* Full name */}
//           <div className="my-2">
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="Write your name"
//             />
//           </div>

//           {/* Email */}
//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="Write your email"
//             />
//           </div>

//           {/* Phone number */}
//           <div className="my-2">
//             <Label>Phone Number</Label>
//             <Input
//               type="number"
//               value={input.phonenumber}
//               name="phonenumber"
//               onChange={changeEventHandler}
//               placeholder="Write your phone number"
//             />
//           </div>

//           {/* Password */}
//           <div className="my-2 relative"> {/* Ensure it's wrapped in relative container */}
//             <Label>Password</Label>
//             <Input
//               type={showPassword ? "text" : "password"}
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="Write your password"
//               className="pr-10"
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-8 z-10 cursor-pointer"
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} color="black" />
//               ) : (
//                 <AiOutlineEye fontSize={24} />
//               )}
//             </span>
//           </div>

//           {/* Role */}
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === "student"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>

//             {/* Profile */}
//             <div className="flex items-center gap-2">
//               <Label>Profile</Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="cursor-pointer"
//               />
//             </div>
//           </div>

//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Signup
//             </Button>
//           )}

//           <span className="text-sm ">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { sendOtp } from "@/services/authAPI";


export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "", // Initialize as null
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
 
  const { fullname, email, phonenumber, password, role, file } = input;
  useEffect(() => {
    dispatch(setUser("")); // Clear user data on component mount
  }, []);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    

    setInput((prevData) => ({
      ...prevData,
      [name]:value,
    }));
    
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
     
    const user = { ...input };
    dispatch(setUser(user));
    dispatch(sendOtp(input.email, navigate));

   
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Full name */}
          <div className="my-2">
            <Label htmlFor="fullname" className="block mb-1">
              Full Name
            </Label>
            <Input
              type="text"
              value={fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone number */}
          <div className="my-2">
            <Label htmlFor="phonenumber" className="block mb-1">
              Phone Number
            </Label>
            <Input
              type="number"
              value={phonenumber}
              name="phonenumber"
              onChange={changeEventHandler}
              placeholder="Enter 10 digits phone number"
              pattern="[0-9]{10}" 
              required
            />
          </div>

          {/* Password */}
          <div className="my-2 relative">
            <Label htmlFor="password" className="block mb-1">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
           
              value={password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="pr-10"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-8 z-10 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} color="gray" />
              ) : (
                <AiOutlineEye fontSize={24} color="gray" />
              )}
            </span>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>

          {/* Profile Picture */}
          <div className="flex items-center gap-2">
            <Label htmlFor="file" className="block mb-1">
              Profile
            </Label>
            <Input
              type="file"
              accept="image/*"
       
              onChange={changeFileHandler}
              required
              className="cursor-pointer"
            />
          </div>
          </div>
          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}

          {/* Login Link */}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

