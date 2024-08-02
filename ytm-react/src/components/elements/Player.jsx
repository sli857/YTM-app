import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../content/Content.css";

const Player = ({ trackId, pid }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // State for image source
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/stream?trackid=${trackId}`,
          { responseType: "blob" }
        );
        const url = URL.createObjectURL(response.data);
        setAudioSrc(url);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };
    fetchTrack();
  }, [trackId]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/metadata/image?pid=${pid}`,
          { responseType: "blob" }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [pid]); // This effect runs when pid changes

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    setProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const nextTrack = () => {
    // Implement logic to fetch the next track id and pid for image
  };

  const previousTrack = () => {
    // Implement logic to fetch the previous track id and pid for image
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container">
      <img
        src={imageSrc || "./src/assets/default.jpg"} // Use dynamic imageSrc or fallback to default
        alt="Album Image"
        className="album-image"
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="controls">
        <button onClick={previousTrack} className="control-button">
          Previous
        </button>
        <button onClick={togglePlayPause} className="control-button">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={nextTrack} className="control-button">
          Next
        </button>
      </div>
      <div className="progress-container">
        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          min="0"
          max="100"
          className="progress-bar"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="volume-container">
        <label htmlFor="volume">Volume: </label>
        <input
          type="range"
          id="volume"
          value={volume}
          onChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.01"
          className="volume-bar"
        />
      </div>
    </div>
  );
};

export default Player;
