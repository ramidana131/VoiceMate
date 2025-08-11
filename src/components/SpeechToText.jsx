import { useState, useEffect } from "react";
import { FiMic, FiCopy, FiRefreshCw } from "react-icons/fi";
import { FaVolumeUp } from "react-icons/fa";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      setVoices(voiceList);
      if (voiceList.length > 0) setSelectedVoice(voiceList[0]);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };

    recognition.start();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const speakText = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
  };

  const resetText = () => {
    setText("");
  };

  return (
    <div className="relative">
      <h2 className="font-semibold text-lg mb-3 flex items-center justify-between">
        🎤 Speech to Text
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

      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={startListening}
          className={`p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition ${
            listening ? "animate-bounce" : ""
          }`}
          aria-label={listening ? "Stop Listening" : "Start Listening"}
        >
          <FiMic />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white transition"
          aria-label="Copy Text"
        >
          <FiCopy />
        </button>
        <button
          onClick={speakText}
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition"
          aria-label="Speak Text"
        >
          <FaVolumeUp />
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        className="w-full rounded-md p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white resize-none"
        placeholder="Your speech will appear here..."
      />
    </div>
  );
}
