import React from 'react';
import { Target } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#F08A3E] to-[#E17226] rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Target className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-[#F3F4F6] mb-4">
          FitTracker
        </h1>
        <p className="text-xl text-[#CBD5E1] mb-8">
          Your adaptive fitness companion
        </p>
        
        <button className="w-full bg-gradient-to-r from-[#F08A3E] to-[#E17226] text-white font-bold py-4 px-8 rounded-2xl">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;