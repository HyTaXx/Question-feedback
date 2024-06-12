import React, { useState } from 'react';
import MistralClient from '@mistralai/mistralai';

const apiKey = "XzIHtMUxAkRvmu59OrKKMflXelzUgXpB"

const App = () => {
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const client = new MistralClient(apiKey);

    try {
      const chatResponse = await client.chat({
        model: 'mistral-tiny',
        messages: [
          { 
            role: 'user', 
            content: question 
          },
          {
            role: 'system',
            content: 'Give a feedback on how to improve the question.'
          }
        ],
      });

      setFeedback(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback('Failed to get feedback.');
    }

    try {
      const chatResponse = await client.chat({
        model: 'mistral-tiny',
        messages: [
          { 
            role: 'user', 
            content: question 
          },
          {
            role: 'system',
            content: 'Be severe,please rate the question on a scale from 0 to 100. Provide only a numerical score (e.g., 85/100) without additional text explanations remove commentaries. The outpust must be only an integer (for examle 50). Base your rating on the following criteria: clarity, relevance, complexity, originality, accuracy, structure, grammar, spelling, punctuation, formatting, and style.'
          }
        ],
      });

      setScore(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching score:', error);
      setScore('Failed to get score.');
    }
  };

  return (
    <div className="max-w-2xl bg-white mx-auto p-4 shadow-md rounded m-2">
      <form onSubmit={handleSubmit} className="grid">
        <label htmlFor="question">Enter your question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={"What is the capital of France?"}
          className="bg-neutral-100 p-2 rounded shadow mt-2"
        />
        <button type="submit" className="p-2 bg-indigo-500 text-white font-semibold rounded w-fit mt-2">Submit</button>
      </form>
      <div className="border-b border-neutral-300 my-4"></div>
      <div className='flex flex-col mt-4'>
        <h2 className="text-2xl font-bold mb-2">Feedback</h2>
        {feedback && <p className='font-medium'>{feedback}</p>}
        {score && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap"><b>Score :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`} style={{width: score === "Loading..." ? "0" : score.replace("/100", "%")}}></div>
          </div>
          {score}
        </p>}
      </div>
    </div>
  );
};

export default App;