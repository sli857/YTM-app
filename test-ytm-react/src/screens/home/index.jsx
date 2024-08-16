import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library/index.jsx";
import Explore from "../explore/explore.jsx";
import Player from "../player/player.jsx";
import Sidebar from "../../components/sidebar/index.jsx";
import Auth from "../auth/auth.jsx";
import "./home.css";

// export default function Home() {
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const token = window.localStorage.getItem("token");
//     const hash = window.location.hash;
//     window.location.hash = "";
//     if (!token && hash) {
//       const _token = hash.split("&")[0].split("=")[1];
//       window.localStorage.setItem("token", _token);
//       setToken(_token);
//       setClientToken(_token);
//     } else {
//       setToken(token);
//       setClientToken(token);
//     }
//   }, []);

//   return !token ? (
//     <Auth />
//   ) : (
//     <Router>
//       <div className="main-body">
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<Explore />} />
//           <Route path="/library" element={<Library />} />
//           <Route path="/player" element={<Player />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
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
