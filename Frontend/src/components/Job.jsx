
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const daysAgoFunction = (mongodbTime) => {
   const createdAt = new Date(mongodbTime);
   const currentTime = new Date();
   const timeDifference = currentTime - createdAt;
   return Math.floor(timeDifference / (24 * 60 * 60 * 1000)); // 1 day = 24hrs, 1hr = 60mins, 1min = 60sec, 1sec = 1000ms
}

export default function Job({ job }) {  // Capitalized component name
  const navigate = useNavigate();
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button> {/* Fixed className */}
      </div>
       
      <div className='flex items-center gap-2 my-2'> 
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} {job?.position === 1 ? 'position' : 'positions'}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}</Badge>
      </div>
      <div className='flex mt-4 '>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="w-full py-4 text-sm ">Details</Button>
        
      </div>
    </div>
  )
}
