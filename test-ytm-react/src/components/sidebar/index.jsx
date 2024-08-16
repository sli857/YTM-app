import React from "react";
import SidebarButton from "./sidebarButton";
import "./sidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
function Sidebar() {
  return (
    <div className="sidebar-container">
      <img src="/YTM-logo.webp" className="profile-img" alt="profile image" />
      <div>
        <SidebarButton title="Explore" to="/" icon={<MdSpaceDashboard />} />
        <SidebarButton
          title="Library"
          to="/library"
          icon={<MdLibraryBooks />}
        />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
      </div>
      <SidebarButton title="logout" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}

export default Sidebar;
