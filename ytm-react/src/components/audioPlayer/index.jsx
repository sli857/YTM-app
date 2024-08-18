import React from "react";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";
import Controls from "./controls";
import "./audioPlayer.css";

function AudioPlayer({ currentTrack, currentImage }) {
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
          color="#C96850"
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
