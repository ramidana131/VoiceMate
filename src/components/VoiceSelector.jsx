export default function VoiceSelector({ voices, selectedVoice, setSelectedVoice }) {
  return (
    <select
      value={selectedVoice?.name}
      onChange={(e) => {
        const voice = voices.find((v) => v.name === e.target.value);
        setSelectedVoice(voice);
      }}
      className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-700"
    >
      {voices.map((voice, i) => (
        <option key={i} value={voice.name}>
          {voice.name} ({voice.lang})
        </option>
      ))}
    </select>
  );
}
