import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your components here
import Home from "../content/Home.jsx";
// import Library from "../content/Library.jsx";
// import Playlist from "../content/Playlists.jsx";
// import Album from "../content/Album.jsx";

function YtmApp() {
  return (
    <Routes>
      <Route index path="/explore" element={<Home />} />
      {/* <Route path="/library" element={<Library />} />
      <Route path="/playlist/:playlistId" element={<Playlist />} />
      <Route path="/album/:albumId" element={<Album />} /> */}
    </Routes>
  );
}

export default YtmApp;
