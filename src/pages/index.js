import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const calculatorCategories = [
  {
    title: 'Basic Calculator',
    description: 'Perform basic arithmetic operations, area, volume, and more',
    path: '/basic',
    icon: '🔢',
    keywords: ['arithmetic', 'math', 'calculate', 'basic', 'add', 'subtract', 'multiply', 'divide', 'volume', 'area', 'percentage', 'age', 'days', 'duration', 'random']
  },
  {
    title: 'Financial Calculator',
    description: 'Calculate loans, investments, taxes, and currency conversions',
    path: '/financial',
    icon: '💰',
    keywords: ['money', 'finance', 'loan', 'interest', 'investment', 'tax', 'currency', 'gst', 'emi']
  },
  {
    title: 'Health Calculator',
    description: 'Track BMI, calories, fitness metrics, and sleep patterns',
    path: '/health',
    icon: '❤️',
    keywords: ['bmi', 'calories', 'weight', 'health', 'fitness', 'steps', 'pace', 'sleep']
  },
  {
    title: 'Math & Engineering',
    description: 'Advanced calculations for mathematics and engineering',
    path: '/math-engineering',
    icon: '📐',
    keywords: ['mathematics', 'engineering', 'advanced', 'scientific', 'trigonometry', 'algebra']
  },
  {
    title: 'Unit Converters',
    description: 'Convert between different units of measurement',
    path: '/unit-converters',
    icon: '⚖️',
    keywords: ['convert', 'measurement', 'units', 'length', 'weight', 'temperature', 'volume']
  },
  {
    title: 'Miscellaneous',
    description: 'Other useful calculators and tools',
    path: '/miscellaneous',
    icon: '🔧',
    keywords: ['other', 'misc', 'tools', 'utility']
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(calculatorCategories);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = calculatorCategories.filter(category =>
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
      setFilteredCategories(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="text-center mb-24 relative">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-24 left-1/3 transform -translate-x-1/2 w-96 h-96 bg-slate-500/20 dark:bg-slate-500/10 rounded-full filter blur-3xl"></div>
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-700 dark:from-slate-300 dark:via-indigo-400 dark:to-slate-300 mb-8 tracking-tight animate-fade-in relative z-10 leading-tight">
            Calculator Hub
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-16 animate-fade-in-delay leading-relaxed font-medium">
            Your comprehensive solution for all types of calculations
          </p>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-8 py-5 text-lg rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 shadow-lg transition-all duration-300 dark:text-white pl-14 group-hover:border-indigo-400 dark:group-hover:border-indigo-500"
              />
              <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl transition-transform duration-300 group-hover:scale-110">
                🔍
              </span>
              {isSearching && (
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {filteredCategories.length === 0 ? (
          <div className="text-center text-xl text-slate-600 dark:text-slate-400 animate-fade-in">
            No calculators found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-delay">
            {filteredCategories.map((category) => (
              <Link
                key={category.path}
                href={category.path}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-indigo-50/80 dark:hover:bg-slate-700/80 border border-slate-100 dark:border-slate-700 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">
                    {category.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {category.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;