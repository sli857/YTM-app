import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIKit from "/src/APIs.js";
import SongCard from "/src/components/songCard";
import Queue from "/src/components/queue";

import "./player.css";

function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    if (location.state) {
      const pid = location.state.pid;
      APIKit.get(`metadata/playlist?pid=${pid}`).then((res) => {
        setTracks(res.data.playlist);
        setCurrentImage(res.data.image);
        setCurrentTrack(res.data.playlist[0]);
      });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body"></div>
      <div className="right-player-body">
        <SongCard album={tracks} image={currentImage} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}

export default Player;
