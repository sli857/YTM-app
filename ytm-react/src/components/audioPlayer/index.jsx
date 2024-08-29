import React, { useState, useRef, useEffect } from "react";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";
import Controls from "./controls";
import APIKit from "/src/APIs.js";
import "./audioPlayer.css";

function AudioPlayer({
  currentTrack,
  currentImage,
  currentIndex,
  setCurrentIndex,
  tracks,
}) {
  const imageUrl =
    currentImage === undefined
      ? null
      : URL.createObjectURL(
          new Blob([new Uint8Array(currentImage?.data)], {
            type: "image/jpg",
          })
        );

  const getTrackSrc = (trackId) => {
    return `http://localhost:3000/stream?trackid=${trackId}`;
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioSrc = getTrackSrc(tracks[currentIndex]?.trackid);

  const audioRef = useRef(null);

  const intervalRef = useRef();

  const isReady = useRef(false);

  useEffect(() => {
    // Create a new audio object each time the source changes
    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;
    setTrackProgress(0); // Reset progress on new audio

    const startTimer = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (newAudio.ended) {
          handleNext();
        } else {
          setTrackProgress(newAudio.currentTime);
        }
      }, 1000);
    };

    const onLoadedMetadata = () => {
      // Metadata has loaded, update duration, etc.
      if (isPlaying) {
        newAudio.play();
        startTimer();
      }
      isReady.current = true;
    };

    newAudio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      newAudio.pause();
      clearInterval(intervalRef.current);
      newAudio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioSrc, isPlaying]);

  useEffect(() => {
    // Cleanup function for unmounting
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentIndex(prevIndex);
  };

  const addZero = (n) => (n > 9 ? `${n}` : `0${n}`);

  const currentPercentage = audioRef.current?.duration
    ? (trackProgress / audioRef.current.duration) * 100
    : 0;

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={imageUrl}
          size={300}
          color="#c96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.title}</p>
        <p className="song-artist">{Array(currentTrack?.artist).join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">{formatTime(trackProgress)}</p>
            <WaveAnimation isPlaying={true} />
            <p className="duration">{currentTrack?.length}</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={tracks}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
