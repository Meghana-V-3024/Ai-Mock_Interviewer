"use client"
import React,{useState} from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'

  

function AddNewInterView() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setExperience]=useState();
    const [loading,setLoading]=useState(false);


    const onSubmit=async(e)=>{
      setLoading(true)
      e.preventDefault()
      console.log(jobPosition,jobDesc,jobExperience);

      const InputPrompt="Job Position:"+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+" Depends on this information please give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question with Answered in Json Format, Give Question and Answered as field in JSON"

      const result =await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace("```json" ,"").replace("```","");
      console.log(JSON.parse(MockJsonResp));
      setLoading(false);

    }


    
  return (
    <div>
      <div className='p-10 border rounded-lg bg-slate-300 hover:scale-105 hover:shadow cursor-pointer transition-all'
      onClick={()=>setOpenDailog(true)}
      >
         <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDailog}>

  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-xl'>Tell us more about your job Interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>

        <div>
            <h2>Add Details about your Job position/role, Job description and years of experience</h2>

            <div className='mt-7 my-3'>
                <label>Job Role/Job Position</label>
                <Input placeholder="Ex: Full Stack Developer" required 
                onChange={(event)=>setJobPosition(event.target.value)} 
                />
            </div>
            
            <div className='my-3'>
                <label>Job Description/Teck Stack (In Short)</label>
                <Textarea placeholder="Ex: React, Angular, NextJs, Mysql"  required 
                onChange={(event)=>setJobDesc(event.target.value)} 
                />
            </div>
            <div className='my-3'>
                <label>Years of Experience</label>
                <Input placeholder="5" type="number"  max="100" required 
                onChange={(event)=>setExperience(event.target.value)} 
                />
            </div>  
        </div>
    
        <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}> cancel </Button>
            <Button type="submit" disabled={loading}> 
              {loading?
                <>
                <LoaderCircle className='animate-spin'/>'Generating From AI'
                </>:'Start Interview'
              }
              </Button>
        </div>
    </form>
   
    

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterView
