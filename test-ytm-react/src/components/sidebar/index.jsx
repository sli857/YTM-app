import React from "react";
import SidebarButton from "./sidebarButton";
import "./sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar-container">
      <img
        src="./src/assets/slaythespire.jpg"
        className="profile-img"
        alt="profile image"
      />
      <div>
        <SidebarButton title="Explore" to="/" icon={<></>} />
        <SidebarButton title="Library" to="/library" icon={<></>} />
        <SidebarButton title="Player" to="/player" icon={<></>} />
      </div>
      <SidebarButton title="logout" to="" icon={<></>} />
    </div>
  );
}

export default Sidebar;
