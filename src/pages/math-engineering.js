import React from 'react';

const MathEngineering = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-24 left-1/3 transform -translate-x-1/2 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-purple-400 mb-4 tracking-tight animate-fade-in">
            Math & Engineering Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-delay leading-relaxed">
            We're currently developing advanced mathematical and engineering calculators to provide you with precise and reliable calculations.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300 shadow-lg">
              <span className="text-4xl">🔧</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Coming Soon
          </h2>

          <div className="space-y-4 text-center text-lg text-gray-600 dark:text-gray-300">
            <p className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl">📐</span>
              <span>Scientific Calculator</span>
            </p>
            <p className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl">🔢</span>
              <span>Matrix Operations</span>
            </p>
            <p className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl">➗</span>
              <span>Quadratic Equations</span>
            </p>
            <p className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl">∫</span>
              <span>Integral Calculator</span>
            </p>
            <p className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 transform hover:scale-105 transition-all duration-300">
              <span className="text-2xl">🔋</span>
              <span>And many more...</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default MathEngineering;
