import React, { useState } from 'react';

interface TeleprompterInputProps {
  onStart: (text: string) => void;
  initialScript: string;
}

const TeleprompterInput: React.FC<TeleprompterInputProps> = ({ onStart, initialScript }) => {
  const [text, setText] = useState<string>(initialScript);

  const handleStartClick = () => {
    if (text.trim()) {
      onStart(text);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400 mb-6 text-center">
          Teleprompter Pro
        </h1>
        <p className="text-lg text-yellow-200 mb-8 text-center">
          Pegue su texto a continuación y presione Iniciar.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escriba o pegue su guión aquí..."
          className="w-full h-64 sm:h-80 bg-gray-900 text-yellow-300 border-2 border-yellow-500 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
        />
        <button
          onClick={handleStartClick}
          disabled={!text.trim()}
          className="mt-8 bg-yellow-400 text-black font-bold text-xl py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-transform duration-200 ease-in-out disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          INICIO
        </button>
      </div>
    </div>
  );
};

export default TeleprompterInput;
