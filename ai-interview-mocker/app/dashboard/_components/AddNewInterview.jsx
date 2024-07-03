// src/app/dashboard/_components/AddNewInterview.jsx

"use client"
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label"
import { Dialog, DialogOverlay, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { ChatSession } from '@google/generative-ai';
import{chatSession} from "/utils/GemniAiModel.js"
import { Loader2, LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import {db} from '/utils/db.js'
import{MockInterview} from '/utils/schema.js'
import {mockId} from '/utils/schema.js'
import { useRouter } from 'next/navigation';







function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc]=useState();
  const [jobExperience,setjobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const[jsonResponse,setJsonResponse]=useState([]);
  const {user}=useUser();
  const router=useRouter();



  const handleSubmit = async(event) => {
	setLoading(true);

    event.preventDefault();
	console.log(jobPosition,jobDesc,jobExperience)
    // Add your form submission logic here
   // Close the dialog after form submission


   const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience:" +jobExperience+", Depends on Job Position, Job Description & Years of Experience give us"+process.env.NEXT_PUBLIC_INTERVIEW_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field in JSON"
    const result=await chatSession.sendMessage(InputPrompt);
	const MockJsonResponse=(result.response.text()).replace('```json','').replace('```','')
	console.log(JSON.parse(MockJsonResponse));

  
  setJsonResponse(MockJsonResponse);
	

  if(MockJsonResponse){
    
  const resp=await db.insert(MockInterview)
  .values({
    mockId:uuidv4(),
    jsonMockResp:MockJsonResponse,
    jobPosition:jobPosition,
    jobDesc:jobDesc,
    jobExperience:jobExperience,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy')

  
  }).returning({mockId:MockInterview.mockId})

  console.log("Inserted Id:",resp);
  if(resp){
    setOpenDialog(false);
    router.push('/dashboard/interview/'+resp[0]?.mockId);
  }

}
else{
  console.log("ERROR!!");
}





setLoading(false);
  }
  



  return (
    <div className='max-w-xl'>
      {/* Add New button */}
      <button
        className='p-4 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg'>+ Add New</h2>
      </button>
      
      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <DialogClose asChild>
            <button
              type="button"
              className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setOpenDialog(false)}
            >
              Close
            </button>
          </DialogClose>
          
          <DialogTitle className="text-xl font-bold mb-4 text-gray-800">Tell Us More About Your Interview</DialogTitle>
          <DialogDescription className="text-base text-gray-600 mb-4">
            Add details about your job position/role, job description, and years of experience.
          </DialogDescription>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div>
                <Label className="text-sm text-gray-800">Job Role/Job Position</Label>
                <input className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500" placeholder="Ex. Full Stack Developer" required
				onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>
              <div>
                <Label className="text-sm text-gray-800" htmlFor="message">Job Description/Tech Stack</Label>
                <textarea className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500" placeholder="Ex. React, Nodejs, Django" required onChange={(event)=>setJobDesc(event.target.value)}/>
              </div>
              <div>
                <Label className="text-sm text-gray-800" htmlFor="message">Years of Experience</Label>
                <input className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500" placeholder="Ex. 2"  type='number'required onChange={(event)=>setjobExperience(event.target.value)}/>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end mt-6">
                <button disabled={loading} 
                  type='submit'
                  className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
					{loading?
				<>
					<LoaderCircle className='animate-spin'/>Gernerating Questions
					</>:'Start Interview'
				}
                 
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  type='button'
                  className="ml-3 px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
