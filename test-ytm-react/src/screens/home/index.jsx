import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library/index.jsx";
import Explore from "../explore/explore.jsx";
import Player from "../player/player.jsx";
import Sidebar from "../../components/sidebar/index.jsx";
import Auth from "../auth/auth.jsx";
import "./home.css";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);

  return !authorized ? (
    <Auth setAuth={setAuthorized} />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}
