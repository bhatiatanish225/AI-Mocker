"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

function RecordAnsSection() {
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(true);
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    // Check for SpeechRecognition API support
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
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
    setTranscripts(results.map(result => result.transcript));
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
          <h1>Recording: {isRecording.toString()}</h1>
          {error && <p className="text-red-500">Error: {error}</p>}
          <button
            type="button"
            className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-8 rounded"
            style={{ marginLeft: '40%', marginRight: '10%' }}
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      ) : (
        <p className="text-red-500">
          Speech Recognition API is not supported in this browser. Please use Chrome or a Chromium-based browser with Speech Recognition API support enabled.
        </p>
      )}
    </div>
  );
}

export default RecordAnsSection;
