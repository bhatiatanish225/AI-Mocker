"use client";
import React, { useEffect, useState } from "react";
import { db } from "/utils/db.js";
import { MockInterview } from "/utils/schema.js";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import Link from 'next/link';

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-5xl">
        <h2 className="font-bold text-2xl mb-5 text-center">Let's Get Started!!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Side: Instruction Panel and Job Information */}
          <div className="w-full md:w-auto">
            {/* Instruction Panel */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-7">
              <h3 className="text-lg font-bold mb-2">Instructions:</h3>
              <p className="text-sm mb-2">
                Enable video Web Cam and Microphone to start your AI Generated Mock Interview. 
                It has 5 questions which you can answer and at the last, you will get the report 
                based on your answers.
              </p>
              {/* Add more instructions as needed */}
            </div>

            {/* Job Information Section */}
            {interviewData && (
              <div className="bg-gray-100 p-4 rounded-lg mb-7">
                <h3 className="text-lg font-bold mb-2">Job Information:</h3>
                <p className="text-sm mb-2">
                  <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                </p>
                <p className="text-sm mb-2">
                  <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                </p>
                <p className="text-sm">
                  <strong>Years Of Experience:</strong> {interviewData.jobExperience}
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Webcam Section */}
          <div className="w-full md:w-auto flex flex-col items-center">
            <div className="flex justify-center items-center">
              {webCamEnabled ? (
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  className="w-96 h-96 md:w-[30rem] md:h-[30rem]"
                />
              ) : (
                <WebcamIcon className="h-96 w-96 my-7 p-20 bg-secondary rounded-lg border" />
              )}
            </div>
            {!webCamEnabled && (
              <button
                onClick={() => setWebCamEnabled(true)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 mt-auto"
                style={{ minWidth: "200px" }}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Enable WebCam and Microphone
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Start Interview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
