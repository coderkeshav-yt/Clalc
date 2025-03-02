import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group py-2">
              <span className="text-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-12 filter drop-shadow-lg">🧮</span>
              <span className="text-white font-extrabold text-xl tracking-tight group-hover:text-slate-200 transition-all duration-300 filter drop-shadow">
                Calculator Hub
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/basic" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Basic</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/financial" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Financial</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/health" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Health</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/unit-converters" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Unit Converters</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/math-engineering" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Math & Engineering</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/miscellaneous" className="text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-slate-600/30 relative overflow-hidden group">
              <span className="relative z-10">Miscellaneous</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
              {!isOpen ? (
                <svg className="block h-6 w-6 transition-transform duration-300 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6 transition-transform duration-300 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-gradient-to-r from-indigo-600/95 via-blue-600/95 to-purple-600/95 border-t border-white/5 shadow-lg">
          <Link href="/basic" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Basic</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link href="/financial" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Financial</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link href="/health" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Health</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link href="/unit-converters" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Unit Converters</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link href="/math-engineering" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Math & Engineering</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link href="/miscellaneous" className="text-white/90 hover:text-white block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Miscellaneous</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-all duration-300 group-hover:w-full"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;