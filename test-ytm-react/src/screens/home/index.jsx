import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library/index.jsx";
import Explore from "../explore/explore.jsx";
import Favorites from "../favorites/favorites.jsx";
import Trending from "../trending/trending.jsx";
import Player from "../player/player.jsx";
import Sidebar from "../../components/sidebar/index.jsx";

import "./home.css";

export default function Home() {
  return (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route paht="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
