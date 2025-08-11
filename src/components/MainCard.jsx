import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";

export default function MainCard({ theme }) {
  const [speechText, setSpeechText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleReset = () => {
    setSpeechText("");
    setTextToSpeak("");
  };

  return (
    <div
      className={`w-full max-w-3xl rounded-xl shadow-xl p-5 space-y-5 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <SpeechToText speechText={speechText} setSpeechText={setSpeechText} />
      <TextToSpeech textToSpeak={textToSpeak} setTextToSpeak={setTextToSpeak} />
    </div>
  );
}
