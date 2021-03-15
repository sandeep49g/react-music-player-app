import React, { useState, useEffect } from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  name,
  artist,
  cover,
  id,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  active,
}) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong({ ...selectedSong[0] });
    //Set Active in library
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    //Play audio
    setTimeout(() => playAudio(isPlaying, audioRef), 150);
  };

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
        setCurrentAudioCover(cover);
      }
    };
    if (cover) {
      loadCurrentSongCover(cover);
    }
  }, [cover]);

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${active ? "selected" : ""}`}
    >
      <img src={currentAudioCover} alt="" />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
