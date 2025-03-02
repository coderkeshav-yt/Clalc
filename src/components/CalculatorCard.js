import React, { useState } from 'react';

const CalculatorCard = ({ title = "Basic Calculator" }) => {
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
    <div className="bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-2xl max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl border border-slate-200 dark:border-slate-700 backdrop-filter backdrop-blur-lg transform hover:scale-[1.02] hover:-translate-y-1">
      <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-indigo-600 dark:from-slate-300 dark:to-indigo-400">{title}</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full px-6 py-4 text-right text-2xl bg-white/80 dark:bg-slate-900/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:text-white font-mono tracking-wider shadow-inner transition-all duration-300 animate-fade-in"
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
              className={`group relative ${item === '=' 
                ? 'bg-gradient-to-r from-indigo-500 to-slate-600 hover:from-indigo-600 hover:to-slate-700 text-white'
                : item === 'C'
                ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white'
                : typeof item === 'number'
                ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-indigo-600 dark:text-indigo-400'
              } rounded-2xl p-4 text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 backdrop-blur-sm min-h-[4rem] flex items-center justify-center transform hover:-translate-y-0.5 overflow-hidden`}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in">
          Result: <span className="text-indigo-600 dark:text-indigo-400 font-mono">{result}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
