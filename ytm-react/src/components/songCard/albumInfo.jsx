import React from "react";

import "./albumInfo.css";

function AlbumInfo({ album }) {
  console.log(album);
  const artists = [];
  album.map((track) => {
    track.artist.map((e) => {
      if (!artists.includes(e)) {
        artists.push(e);
      }
    });
  });
  console.log(artists);
  return (
    <div>
      <div className="albumName-container">
        <p></p>
      </div>
      <div className="album-info">
        <p></p>
      </div>
      <div className="album-release">
        <p></p>
      </div>
    </div>
  );
}

export default AlbumInfo;
