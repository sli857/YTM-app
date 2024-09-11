import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library";
import Explore from "../explore";
import Player from "../player";
import Sidebar from "../../components/sidebar";
import Auth from "../auth";
import "./home.css";
import axios from "axios";
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
