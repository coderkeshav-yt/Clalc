import React, { useState } from 'react';

const CalculatorCard = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-2xl max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700 backdrop-filter backdrop-blur-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Basic Calculator</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full px-6 py-4 text-right text-2xl bg-white/80 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white font-mono tracking-wider shadow-inner transition-all duration-300"
        />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 'C', 0, '=', '/'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === '=') {
                  calculateResult();
                } else if (item === 'C') {
                  clearInput();
                } else {
                  handleButtonClick(item);
                }
              }}
              className={`${
                item === '=' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  : item === 'C'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                  : typeof item === 'number'
                  ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400'
              } rounded-2xl p-4 text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 backdrop-blur-sm min-h-[4rem] flex items-center justify-center transform hover:-translate-y-0.5`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          Result: <span className="text-blue-600 dark:text-blue-400 font-mono">{result}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
