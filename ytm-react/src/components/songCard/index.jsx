import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";

import "./songCard.css";

function SongCard({ album, image }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage image={image} />
      <AlbumInfo album={album} />
    </div>
  );
}

export default SongCard;
