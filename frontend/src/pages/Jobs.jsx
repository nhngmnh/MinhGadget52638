import React from 'react'
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
    const navigate=useNavigate();
    const jobs = [
        { title: 'Accountant', location: 'Hanoi, Vietnam',number: 2 },
        { title: 'Cashier', location: 'Ho Chi Minh City, Vietnam',number: 3 },
        { title: 'Warehouse Manager', location: 'Da Nang, Vietnam',number: 1 },
        { title: 'Sales Representative', location: 'Can Tho, Vietnam',number: 0 },
        { title: 'Customer Support', location: 'Hai Phong, Vietnam',number: 2 },
      ];
  return (
    <div className="min-h-screen bg-gray-100 p-10 ">
      <h1 className="text-3xl font-bold text-center mb-12 mt-6">Job Opening</h1>
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="divide-y divide-gray-200">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="p-4 hover:bg-blue-100 transition-colors duration-300 grid grid-cols-[6fr_1fr]"
            >
              <div><h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.location}</p></div>
              <div className='mt-2'>Number: {job.number}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center'><button onClick={()=>navigate('/contact')} className='flex justify-center p-5 m-5 bg-white text-black hover:bg-primary hover:text-white rounded-lg transition-transform duration-300 hover:scale-110'>Contact for jobs</button></div>
      
    </div>
  )
}

export default Jobs