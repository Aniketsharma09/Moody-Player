import { useState, useRef } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]); // Array of refs for each audio element

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (!currentAudio) return;

    // If the clicked song is already playing -> pause it
    if (isPlaying === index) {
      currentAudio.pause();
      setIsPlaying(null);
    } else {
      // Pause any previously playing song
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause();
      }
      currentAudio.play();
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>
      {songs.map((song, index) => (
        <div className="song" key={index}>
          <div className="title">
            <h3>{song.originalname}</h3>
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
            />
          </div>
          <div
            onClick={() => handlePlayPause(index)}
            className="play-pause-button"
          >
            {isPlaying === index ? (
              <i className="text-2xl ri-pause-line"></i>
            ) : (
              <i className="text-2xl ri-play-fill"></i>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
