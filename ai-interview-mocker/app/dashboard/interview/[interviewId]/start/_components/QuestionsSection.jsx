import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? 'bg-primary text-white' : ''
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}

		
      </div>
	  <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
	  <div>
		<h2>
			
		</h2>
	  </div>
    </div>
  );
}

export default QuestionsSection;
