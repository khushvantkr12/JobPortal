import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

// applicants se related saari information aayengi like uska resume, usko accept, reject krna hai
export default function Applicants() {
  // get job id from the URL parameters
  const params = useParams();
  const dispatch = useDispatch();
  // fetching applicants from the redux store to show total number of applicants
  const { applicants } = useSelector((store) => store.application);
  
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants (
          {
            applicants?.applications?.length > 0 
              ? applicants?.applications?.length 
              : null
          })
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

