import React, { useEffect, useState } from "react";
import APIKit from "/src/APIs.js";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./explore.css";
function Explore() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    APIKit.get("metadata/playlists").then((res) => {
      setPlaylists(res.data.playlists);
    });
  }, []);

  const playPlaylist = (pid) => {
    navigate("/player", { state: { pid: pid } });
  };

  return (
    <div className="screen-container">
      <div className="explore-body">
        {playlists?.map((playlist) => (
          <div
            key={playlist.pid}
            className="playlist-card"
            onClick={() => playPlaylist(playlist.pid)}
          >
            <img
              className="playlist-image"
              src={URL.createObjectURL(
                new Blob([new Uint8Array(playlist.cover.data)], {
                  type: "image/jpg",
                })
              )}
              alt="playlist"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.count} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "45px", color: "5674a7" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Explore;
