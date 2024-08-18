import React from "react";
import ProgressCircle from "./progressCircle";
import "./audioPlayer.css";

function AudioPlayer({ currentTrack, currentImage }) {
  const url = URL.createObjectURL(
    new Blob([new Uint8Array(currentImage?.data)], {
      type: "image/jpg",
    })
  );

  return (
    <div className="player-body">
      <div className="player-left-body">
        <ProgressCircle
          percentage={75}
          isPlaying={true}
          image={url}
          size={270}
          color="#C96850"
        />
      </div>
      <div className="player-right-body"></div>
    </div>
  );
}

export default AudioPlayer;
