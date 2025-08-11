import { useState, useEffect } from "react";
import { FaVolumeUp, FaStop } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

export default function TextToSpeech() {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // New state

  useEffect(() => {
    function loadVoices() {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
      if (synthVoices.length > 0) setSelectedVoice(synthVoices[0].name);
    }

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const speak = () => {
    if (!textToSpeak.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true); // Start tracking
    utterance.onend = () => setIsSpeaking(false); // Stop tracking
    utterance.onerror = () => setIsSpeaking(false); // In case of error

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false); // Ensure state resets
  };

  const resetText = () => {
    setTextToSpeak("");
  };

  return (
    <div className="relative">
      <h2 className="font-semibold text-lg mb-3 flex items-center justify-between">
        🗣️ Text to Speech
        <button
          onClick={resetText}
          className="p-2 rounded-full 
             bg-gradient-to-r from-red-500 to-rose-500 
             hover:from-red-600 hover:to-rose-600 
             text-white transition-transform 
             hover:rotate-90"
          title="Reset Text"
          aria-label="Reset Text"
        >
          <FiRefreshCw className="w-5 h-5 animate-pulse" />
        </button>
      </h2>

      <textarea
        value={textToSpeak}
        onChange={(e) => setTextToSpeak(e.target.value)}
        rows={4}
        placeholder="Enter text to speak..."
        className="w-full rounded-md p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white resize-none"
      />

      <select
        value={selectedVoice || ""}
        onChange={(e) => setSelectedVoice(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <button
          onClick={speak}
          className="flex items-center gap-2 px-6 py-3 
               bg-gradient-to-r from-blue-500 to-purple-500 
               hover:from-blue-600 hover:to-purple-600 
               text-white rounded-lg 
               transition transform hover:scale-105"
          title="Speak Text"
          disabled={isSpeaking} // Optional: disable while speaking
        >
          <FaVolumeUp className="animate-pulse" />
          Speak
        </button>

        {isSpeaking && ( // Show only while speaking
          <button
            onClick={stopSpeech}
            className="flex items-center gap-2 px-6 py-3 
       bg-gradient-to-r from-orange-500 to-red-600 
       hover:from-orange-600 hover:to-red-700 
       text-white rounded-lg 
       transition transform hover:scale-105"
            title="Stop Speech"
          >
            <FaStop />
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
