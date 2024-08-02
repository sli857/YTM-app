// Playlist.js
import React from "react";

const Playlist = ({ playlist, onPlaylistClick }) => {
  return (
    <li>
      <button onClick={() => onPlaylistClick(playlist.pid)}>
        {playlist.name}
      </button>
    </li>
  );
};

export default Playlist;
