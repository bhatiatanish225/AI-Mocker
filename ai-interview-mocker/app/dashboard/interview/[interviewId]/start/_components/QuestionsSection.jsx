import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10 bg-white shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition duration-300 ease-in-out ${
                activeQuestionIndex === index
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-secondary hover:bg-primary hover:text-white'
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-lg md:text-lg text-gray-800 ">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <div className="border rounded-lg p-5 bg-blue-100 my-10 shadow-sm mt-20">
          <h2 className="flex gap-2 items-center">
            <strong>NOTE:</strong>
          </h2>
          <p className="text-black text-lg my-2">
            Click on Record Answer when you want to answer the question. At the end of the interview, we will provide you feedback along with the correct answers for each question and your answers for comparison.
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
