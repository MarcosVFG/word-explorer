import { useState, useEffect } from 'react';
import words from '../data/words';

const WordCard = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [remainingWords, setRemainingWords] = useState([]);
  const [previousWords, setPreviousWords] = useState([]);
  const [allWordsShown, setAllWordsShown] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize or reset the words list
  useEffect(() => {
    resetWords();
  }, []);

  const resetWords = () => {
    // Create a copy of the words array to avoid modifying the original
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    setRemainingWords(shuffledWords.slice(1));
    setPreviousWords([]);
    setAllWordsShown(false);
    setIsFlipped(false);
    // Get the first word from the shuffled array
    if (shuffledWords.length > 0) {
      setCurrentWord(shuffledWords[0]);
    }
  };

  const getNextWord = () => {
    if (remainingWords.length === 0) {
      setAllWordsShown(true);
      setCurrentWord(null);
      return;
    }

    // Add current word to previous words stack
    if (currentWord) {
      setPreviousWords([...previousWords, currentWord]);
    }

    // Get the next word from the remaining words
    setCurrentWord(remainingWords[0]);
    setRemainingWords(remainingWords.slice(1));
    setIsFlipped(false); // Reset flip state for new word
  };

  const getPreviousWord = () => {
    if (previousWords.length === 0) {
      return; // No previous words
    }

    // Get the last word from previous words
    const lastPreviousWord = previousWords[previousWords.length - 1];
    
    // Add current word back to the beginning of remaining words
    setRemainingWords([currentWord, ...remainingWords]);
    
    // Set the current word to the previous one
    setCurrentWord(lastPreviousWord);
    
    // Remove the last word from previous words
    setPreviousWords(previousWords.slice(0, -1));
    
    setIsFlipped(false); // Reset flip state for new word
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const speakWord = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking the speak button
    
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // Create a new speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      
      // Set language to English
      utterance.lang = 'en-US';
      
      // Optional: set a slightly slower rate for better clarity
      utterance.rate = 0.9;
      
      // Set voice events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      // Speak the word
      window.speechSynthesis.speak(utterance);
    } else {
      // Browser doesn't support speech synthesis
      alert('Seu navegador não suporta a funcionalidade de voz.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md">
        {allWordsShown ? (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center transition-colors duration-200">
            <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">No more words! Refresh to restart.</h2>
            <button
              onClick={resetWords}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Restart
            </button>
          </div>
        ) : currentWord ? (
          <div className="relative w-full h-64 perspective-1000">
            <div 
              className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of card (English) */}
              <div 
                className="absolute w-full h-max p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer backface-hidden transition-colors duration-200"
                onClick={handleCardClick}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 transition-colors">
                    {currentWord.word}
                  </h2>
                  <button
                    onClick={speakWord}
                    className={`ml-3 p-2 rounded-full focus:outline-none ${isSpeaking ? 'text-blue-700 dark:text-blue-300 animate-pulse' : 'text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'}`}
                    title="Ouvir pronúncia"
                    aria-label="Ouvir pronúncia da palavra"
                  >
                    {isSpeaking ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-gray-700 pb-10 dark:text-gray-300 text-center mb-3 transition-colors duration-200">
                  {currentWord.definition}
                </p>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic transition-colors duration-200">
                    Clique para ver a tradução
                  </p>
                </div>
              </div>
              
              {/* Back of card (Portuguese) */}
              <div 
                className="absolute w-full h-max p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer backface-hidden transition-colors duration-200"
                onClick={handleCardClick}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 transition-colors">
                    {currentWord.translationWord}
                  </h2>
                </div>
                <p className="text-gray-700 pb-10 dark:text-gray-300 text-center mb-3 transition-colors duration-200">
                  {currentWord.translationDefinition}
                </p>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic transition-colors duration-200">
                    Clique para voltar
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-1 flex justify-center space-x-4">
              <button
                onClick={getPreviousWord}
                disabled={previousWords.length === 0}
                className={`px-4 py-2 rounded transition-colors ${previousWords.length === 0 
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
                aria-label="Previous Word"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={getNextWord}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Next Word
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center transition-colors duration-200">
            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCard;