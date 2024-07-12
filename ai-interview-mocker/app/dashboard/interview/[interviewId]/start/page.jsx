"use client";
import React, { useEffect, useState } from "react";
import { db } from "/utils/db.js";
import { MockInterview } from "/utils/schema.js";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSection from "./_components/RecordAnsSection";

function Start({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length > 0) {
          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        } else {
          console.warn("No interview found with the provided ID.");
          setMockInterviewQuestion([]);
          setInterviewData(null);
        }
      } catch (error) {
        console.error("Error in GetInterviewDetails:", error);
      }
    };

    if (params.interviewId) {
      GetInterviewDetails();
    }
  }, [params.interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Questions Section */}
        {mockInterviewQuestion ? (
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
          />
        ) : (
          <p>Loading interview questions...</p>
        )}

        {/* Record Answers Section */}
        {mockInterviewQuestion ? (
          <RecordAnsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
        ) : (
          <p>Loading record answers section...</p>
        )}
      </div>
    </div>
  );
}

export default Start;
