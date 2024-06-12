import React, {useState} from 'react';
import MistralClient from '@mistralai/mistralai';

const apiKey = "XzIHtMUxAkRvmu59OrKKMflXelzUgXpB"

const App = () => {
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('');
  const [neutrality, setNeutrality] = useState('');
  const [clarity, setClarity] = useState('');
  const [structure, setStructure] = useState('');
  const [easyToAnalyse, setEasyToAnalyse] = useState('');
  const [precision, setPrecision] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setFeedback('Loading...');
    setScore('Loading...');
    setNeutrality('Loading...');
    setClarity('Loading...');
    setStructure('Loading...');
    setEasyToAnalyse('Loading...');
    setPrecision('Loading...');

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

      // replace all that is not XX/XXX
      const regex = /[^0-9/]/g;
      const scoreString = chatResponse.choices[0].message.content;
      const score = scoreString.replace(regex, '');

      setScore(score);
    } catch (error) {
      console.error('Error fetching score:', error);
      setScore('Failed to get score.');
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
            content: 'How neutral is the question? Answer on a scale from 0 to 100 in the following format: 50/100'
          }
        ],
      });

      const regex = /[^0-9/]/g;
      const neutralityString = chatResponse.choices[0].message.content;
      const neutrality = neutralityString.replace(regex, '');

      setNeutrality(neutrality);
    } catch (error) {
      console.error('Error fetching neutrality:', error);
      setNeutrality('Failed to get neutrality.');
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
            content: 'How clear is the question? Answer on a scale from 0 to 100 in the following format: 50/100'
          }
        ],
      });

      const regex = /[^0-9/]/g;
      const clarityString = chatResponse.choices[0].message.content;
      const clarity = clarityString.replace(regex, '');

      setClarity(clarity);
    } catch (error) {
      console.error('Error fetching clarity:', error);
      setClarity('Failed to get clarity.');
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
            content: 'How structured is the question? Answer on a scale from 0 to 100 in the following format: 50/100'
          }
        ],
      });

      const regex = /[^0-9/]/g;
      const structureString = chatResponse.choices[0].message.content;
      const structure = structureString.replace(regex, '');

      setStructure(structure);
    } catch (error) {
      console.error('Error fetching structure:', error);
      setStructure('Failed to get structure.');
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
            content: 'How easy to analyse is the question? Answer on a scale from 0 to 100 in the following format: 50/100'
          }
        ],
      });

      const regex = /[^0-9/]/g;
      const easyToAnalyseString = chatResponse.choices[0].message.content;
      const easyToAnalyse = easyToAnalyseString.replace(regex, '');

      setEasyToAnalyse(easyToAnalyse);
    } catch (error) {
      console.error('Error fetching easy to analyse:', error);
      setEasyToAnalyse('Failed to get easy to analyse.');
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
            content: 'How precise is the question? Answer on a scale from 0 to 100 in the following format: 50/100'
          }
        ],
      });

      const regex = /[^0-9/]/g;
      const precisionString = chatResponse.choices[0].message.content;
      const precision = precisionString.replace(regex, '');

      setPrecision(precision);
    } catch (error) {
      console.error('Error fetching precision:', error);
      setPrecision('Failed to get precision.');
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
        {feedback && <p className='font-medium mb-8'>{feedback}</p>}
        {score && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Overall Score :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: score === "Loading..." ? "0" : score.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{score}</span>
        </p>}
        {neutrality && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Neutrality :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: neutrality === "Loading..." ? "0" : neutrality.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{neutrality}</span>
        </p>}
        {clarity && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Clarity :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: clarity === "Loading..." ? "0" : clarity.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{clarity}</span>
        </p>}
        {structure && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Structure :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: structure === "Loading..." ? "0" : structure.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{structure}</span>
        </p>}
        {easyToAnalyse && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Easy to analyse :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: easyToAnalyse === "Loading..." ? "0" : easyToAnalyse.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{easyToAnalyse}</span>
        </p>}
        {precision && <p className='font-medium mt-4 flex gap-4'>
          <span className="whitespace-nowrap w-48"><b>Precision :</b></span>
          <div className="w-full relative bg-neutral-200 rounded">
            <div className={`absolute h-full top-0 bg-indigo-500 rounded`}
                 style={{width: precision === "Loading..." ? "0" : precision.replace("/100", "%")}}></div>
          </div>
          <span className="w-28 text-right">{precision}</span>
        </p>}
      </div>
    </div>
  );
};

export default App;