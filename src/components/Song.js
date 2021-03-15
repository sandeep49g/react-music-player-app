import React, { useState, useEffect } from "react";

const Song = ({ currentSong, isPlaying }) => {
  const [currentAudioCover, setCurrentAudioCover] = useState('');
  useEffect(() => {
    const loadCurrentSongCover = async (currentSongCover) => {
      let songCover;
      setCurrentAudioCover('');
      try {
        songCover = await import(`../${currentSongCover}`);
        setCurrentAudioCover(songCover.default);
      }
      catch {
        setCurrentAudioCover(currentSong.cover);
      }
    };
    if (currentSong) {
      loadCurrentSongCover(currentSong.cover);
    }
  }, [currentSong]);

  return (
    <div className="song-container">
      <img
        className={isPlaying ? "rotateSong" : ""}
        src={currentAudioCover}
        alt=""
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
