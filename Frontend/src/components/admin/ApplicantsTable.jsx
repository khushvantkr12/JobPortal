
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";

const shortListingStatus = ["Accepted", "Rejected"];

export default function ApplicantsTable() {
  const [updatedApplicants, setUpdatedApplicants] = useState({});
  const { applicants } = useSelector(store => store.application);

  // Load updated applicants from localStorage on component mount
  useEffect(() => {
    const storedUpdates = JSON.parse(localStorage.getItem("updatedApplicants")) || {};
    setUpdatedApplicants(storedUpdates);
  }, []);

  const statusHandler = async (status, id) => {
    // If the status has already been updated for this applicant, do nothing
    if (updatedApplicants[id]) return;

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);

        // Mark this applicant's status as updated, store the selected status
        const newUpdatedApplicants = {
          ...updatedApplicants,
          [id]: status, // Store the selected status (Accepted/Rejected)
        };
        setUpdatedApplicants(newUpdatedApplicants);

        // Store updated state in localStorage
        localStorage.setItem("updatedApplicants", JSON.stringify(newUpdatedApplicants));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phonenumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="blank" rel="noopener noreferrer">
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, idx) => (
                        <div key={idx} className="flex items-center my-2 cursor-pointer">
                          <input
                            type="checkbox"
                            // Check if this status is the one previously selected and mark as checked
                            checked={updatedApplicants[item?._id] === status}
                            // Disable checkbox if the status was already updated (from localStorage)
                            disabled={!!updatedApplicants[item?._id]}
                            onChange={() => statusHandler(status, item?._id)} 
                          />
                          <span className="ml-2">{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}
