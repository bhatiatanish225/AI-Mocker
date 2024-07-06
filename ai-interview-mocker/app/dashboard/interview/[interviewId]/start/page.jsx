"use client"
import React, { useEffect, useState } from "react";
import { db } from "/utils/db.js";
import { MockInterview } from "/utils/schema.js";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";

function Start({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const[activeQuestionIndex,setActiveQuestionIndex]=useState(0);


  useEffect(() => {
    const GetInterviewDetails = async () => {
      try {
        const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length > 0) {
          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        }
      } catch (error) {
        console.error("Error in GetInterviewDetails:", error);
      }
    };

    GetInterviewDetails();
  }, [params.interviewId]);

  return <div>
	<div className="grid grid-cols-1 md:grid-cols-2">
    {/* Questions */}
    <QuestionsSection
     mockInterviewQuestion={mockInterviewQuestion}
     activeQuestionIndex={activeQuestionIndex}
    
    />

    {/* vides/audio recording  */}
		

	</div>
  </div>;
}

export default Start;
