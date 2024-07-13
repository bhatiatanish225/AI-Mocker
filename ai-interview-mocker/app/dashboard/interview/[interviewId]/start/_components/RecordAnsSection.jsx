"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import{chatSession} from "/utils/GemniAiModel.js"

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    useState(true);
  const [transcripts, setTranscripts] = useState([]);
  const [userAns, setUserAns] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    // Check for SpeechRecognition API support
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsSpeechRecognitionSupported(false);
    }
  }, []);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    setTranscripts(results.map((result) => result.transcript));
  }, [results]);

  // Print transcripts to console whenever they update
  useEffect(() => {
    if (transcripts.length > 0) {
      console.log("Transcripts:", transcripts);
    }
  }, [transcripts]);

  // Check for errors
  if (error) {
    console.error("Speech-to-text error:", error);
  }

  const SaveUserResponse = async () => {
    if (isRecording) {
      stopSpeechToText();
      // Save the response when recording stops
      const combinedTranscripts = transcripts.join(" ");
      setUserAns(combinedTranscripts);
      setWarning("");

      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        results +
        ",Depends on question and user answer for give interview question" +
        "Please give us rating for ans and feedback as area of improvment if any " +
        "in just 3-5 lines to imporve it in JSON format with rating field and feedback field";
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockjsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      console.log(mockjsonResp);
      const JsonFeedbackResp=Json.parse(mockjsonResp);
    } else {
      startSpeechToText();
    }
  };

  return (
    <div>
      <div className="relative flex flex-col my-20 justify-center items-center bg-black rounded-lg shadow-lg mx-10">
        <img
          src="/webcam1.svg"
          alt="Webcam"
          width={300}
          height={300}
          style={{
            position: "absolute",
            padding: 40,
            bottom: 50,
            right: 10,
            margin: "auto",
          }}
          className="absolute top-4 left-4"
        />
        <Webcam
          mirrored={true}
          className=""
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      {isSpeechRecognitionSupported ? (
        <div>
          {error && <p className="text-red-500">Error: {error}</p>}
          <button
            type="button"
            className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-8 rounded"
            style={{ marginLeft: "40%", marginRight: "10%" }}
            onClick={SaveUserResponse}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          {warning && <p className="mt-4 text-red-500">{warning}</p>}
          {userAns && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Your Answer:</h3>
              <p className="text-gray-700">{userAns}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-500">
          Speech Recognition API is not supported in this browser. Please use
          Chrome or a Chromium-based browser with Speech Recognition API support
          enabled.
        </p>
      )}
    </div>
  );
}

export default RecordAnsSection;
