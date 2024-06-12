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
            content: 'Give a rating on the question out of from 0 to 100, the output would just be X/100 dont provide any text as its already in a feedback, just give a number as an output, dont explain why its rated like this. Use these criteria to rate the question : clarity,relevance,complexity, orignilaity, accuracy, structure, grammar, spelling, punctuation, formatting, and style.'
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Enter your question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className='flex flex-col'>
        {feedback && <p className='font-bold'>{feedback}</p>}
        {score && <p className='font-bold'>Note : {score}</p>}
      </div>
    </div>
  );
};

export default App;