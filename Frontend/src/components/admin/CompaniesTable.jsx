import { Edit2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import {  useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CompaniesTable() {
  //SAARI COMPANY KO GET KARWANA HAI
  const {companies,searchCompanyByText}=useSelector(store=>store.company);
  const [filterCompany,setFilterCompany]=useState(companies)//initially company ko daal diya
  const navigate=useNavigate();


 //This useEffect hook runs a side effect whenever either the companies or searchCompanyByText values change.
  useEffect(() => {
     const filterCompany=companies.length >=0 && companies.filter((company) => {
      //If searchCompanyByText is null, empty, or undefined, this means the user has not entered any search text. In this case, it returns true, meaning no filtering is applied, and all companies will be displayed.
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
     });
     setFilterCompany(filterCompany);
     //This means that whenever either companies or searchCompanyByText changes, the code inside the useEffect will be executed.
  },[companies,searchCompanyByText]);



  return (
    <div>
      <Table>
        <TableCaption>A list of your Registered Companies</TableCaption>
          <TableHeader>
           <TableRow>
             <TableHead>Logo</TableHead>
             <TableHead>Name</TableHead>
             <TableHead>Date</TableHead>
             <TableHead className="text-right">Action</TableHead>
           </TableRow>
          </TableHeader>
       <TableBody>
       {
        filterCompany?.map((company,index)=> (
          <tr key={index}>
          <TableCell>
           <Avatar>
           <AvatarImage src={company?.logo}></AvatarImage>
           </Avatar>
         </TableCell>
          <TableCell>{company.name}</TableCell>
          <TableCell>{company.createdAt.split("T")[0]}</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
              <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
              <PopoverContent className="w-32">
               <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                 <Edit2 className='w-4'/>
                 <span>Edit</span>
               </div>
              </PopoverContent>
            </Popover>
          </TableCell>
          </tr>
        ))
      
       }
         
       </TableBody>
      </Table>
    </div>
  )
}
