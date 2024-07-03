"use client";
import React, { useEffect, useState } from "react";
import { db } from "/utils/db.js";
import { MockInterview } from "/utils/schema.js";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";

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
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started!!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Side: Instruction Panel and Job Information */}
        <div className="w-full md:w-auto">
          {/* Instruction Panel */}
          <div className="bg-yellow-100 p-4 rounded-lg my-7">
            <h3 className="text-lg font-bold mb-2">Instructions:</h3>
            <p className="text-sm mb-2">
              Please make sure you are in a quiet environment with good lighting
              for the interview.
            </p>
            <p className="text-sm">
              Click on "Enable WebCam and Microphone" button below to start the
              interview.
            </p>
            {/* Add more instructions as needed */}
          </div>

          {/* Job Information Section */}
          {interviewData && (
            <div className="bg-gray-100 p-4 rounded-lg my-7">
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
                className="w-72 h-72 md:w-96 md:h-96"
              />
            ) : (
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
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
    </div>
  );
}

export default Interview;
