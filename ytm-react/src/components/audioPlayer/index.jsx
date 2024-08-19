import React, { useState, useRef, useEffect } from "react";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";
import Controls from "./controls";
import "./audioPlayer.css";

function AudioPlayer({
  currentTrack,
  currentImage,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = null;

  const audioRef = useRef(new Audio(audioSrc));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  // const startTimer = () => {
  //   clearInterval(intervalRef.current);

  //   intervalRef.current = setInterval(() => {
  //     if (audioRef.current.ended) {
  //       console.log("ended");
  //       handleNext();
  //     } else {
  //       setTrackProgress(audioRef.current.currentTime);
  //     }
  //   }, [1000]);
  // };

  // useEffect(() => {
  //   if (audioRef.current.src) {
  //     if (isPlaying) {
  //       audioRef.current.play();
  //       startTimer();
  //     } else {
  //       clearInterval(intervalRef.current);
  //       audioRef.current.pause();
  //     }
  //   } else {
  //     if (isPlaying) {
  //       audioRef.current = new Audio(audioSrc);
  //       audioRef.current.play();
  //       startTimer();
  //     } else {
  //       clearInterval(intervalRef.current);
  //       audioRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);

  // useEffect(() => {
  //   audioRef.current.pause();
  //   audioRef.current = new Audio(audioSrc);

  //   setTrackProgress(audioRef.current.currentTime);

  //   if (isReady.current) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     startTimer();
  //   } else {
  //     isReady.current = true;
  //   }
  // }, [currentIndex]);

  // useEffect(() => {
  //   return () => {
  //     audioRef.current.pause();
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  // const handleNext = () => {
  //   if (currentIndex < total.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   } else setCurrentIndex(0);
  // };

  // const handlePrev = () => {
  //   if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
  //   else setCurrentIndex(currentIndex - 1);
  // };

  // const addZero = (n) => {
  //   return n > 9 ? "" + n : "0" + n;
  // };
  // const artists = [];
  // currentTrack?.album?.artists.forEach((artist) => {
  //   artists.push(artist.name);
  // });

  const url =
    currentImage === undefined
      ? null
      : URL.createObjectURL(
          new Blob([new Uint8Array(currentImage?.data)], {
            type: "image/jpg",
          })
        );

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={75}
          isPlaying={true}
          image={url}
          size={300}
          color="#c96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.title}</p>
        <p className="song-artist">{Array(currentTrack?.artist).join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">00:01</p>
            <WaveAnimation isPlaying={true} />
            <p className="duration">0:30</p>
          </div>
          <Controls />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
