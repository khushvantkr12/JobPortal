import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Khurja", "Banglore", "Hydrabad", "Pune", "Vapi", "Chennai", "Delhi", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "Full Stack","AI/ML","Data Science","Software Engineer"]
  },
  {
    filterType: "Salary",
    array: ["0-40000", "40000 to 500000", "500000 to 1500000","1500000 to 5000000","5000000 to 10000000"]
  },
];

export default function FilterCard() {
   const [selectedValue,setSelectedValue]=useState("");
 const dispatch=useDispatch();

   const changeHandler = (value) => {
     setSelectedValue(value);
   }
  
  
 
   useEffect(() => {
     dispatch(setSearchQuery(selectedValue));
   },[selectedValue]);


  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-medium text-lg mx-16'>Filter Jobs</h1>
     <hr className='mt-2'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, filterIndex) => (
            <div key={filterIndex}>
              <h1 className='font-bold text-lg mx-16'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  const itemId=`id${filterIndex}-${index}`;
                  return (
                    <div className='flex items-center space-x-2 my-2 mx-16' key={index}>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
}
