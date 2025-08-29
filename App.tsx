import React, { useState, useCallback } from 'react';
import TeleprompterInput from './components/TeleprompterInput';
import TeleprompterDisplay from './components/TeleprompterDisplay';

const App: React.FC = () => {
  const [script, setScript] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const handleStart = useCallback((text: string) => {
    setScript(text);
    setIsStarted(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsStarted(false);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {isStarted ? (
        <TeleprompterDisplay script={script} onReset={handleReset} />
      ) : (
        <TeleprompterInput onStart={handleStart} initialScript={script} />
      )}
    </div>
  );
};

export default App;
