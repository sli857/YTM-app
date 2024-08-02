// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";
import ResultDisplay from "../elements/ResultDisplay";
import Player from "../elements/Player";
import Playlist from "../elements/Playlist";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackId, setTrackId] = useState("2277cc1fd395db6b");
  const [pid, setPid] = useState("97d29279748fec3d");

  const changeTrack = (newTrackId, newPid) => {
    setTrackId(newTrackId);
    setPid(newPid);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/metadata/playlists"
        );
        setPlaylists(response.data.playlists);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = async (pid) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/metadata/playlist?pid=${pid}`
      );
      setSelectedResult(response.data.playlist);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page">
      <div className="navigation-bar">
        {" "}
        <div className="navi-button-container">
          <button className="nav-button">Explore</button>
          <button className="nav-button">Library</button>
        </div>
        <img
          src="./src/assets/slaythespire.jpg"
          className="user-icon"
          onClick={() => {}}
        />
      </div>
      <div className="content-layout">
        <div className="playlist-section">
          <h1>Playlists</h1>
          <ul>
            {playlists.map((playlist) => (
              <Playlist
                key={playlist.id}
                playlist={playlist}
                onPlaylistClick={handlePlaylistClick}
              />
            ))}
          </ul>
        </div>
        <div className="result-section">
          <ResultDisplay onTrackChange={changeTrack} result={selectedResult} />
        </div>
      </div>
      <div className="music-player-bar">
        <Player trackId={trackId} pid={pid} />
      </div>
    </div>
  );
};

export default Home;
