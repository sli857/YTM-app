import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIKit from "/src/APIs.js";
import SongCard from "/src/components/songCard";
import Queue from "/src/components/queue";
import LyricsCard from "/src/components/lyricsCard";
import axios from "axios";
import "./player.css";
import AudioPlayer from "../../components/audioPlayer";
const verify = async () => {
  let res = await axios({
    method: "post",
    url: "http://127.0.0.1:3000/verify",
    withCredentials: true, // 发送凭证，包括cookies等
  });
  if (res.data.msg !== "OK") {
    window.location = "/";
  }
};
verify();

function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const getTracks = () => {
      const pid = location.state?.pid;
      APIKit.get(`metadata/playlist?pid=${pid}`)
        .then((res) => {
          setTracks(res.data?.playlist);
          setCurrentImage(res.data?.image);
          setCurrentTrack(res.data?.playlist[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTracks();
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          currentImage={currentImage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          tracks={tracks}
        />
        <LyricsCard />
      </div>
      <div className="right-player-body">
        <SongCard album={tracks} image={currentImage} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}

export default Player;
