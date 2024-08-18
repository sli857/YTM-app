import React from "react";

import "./albumInfo.css";

function AlbumInfo({ album }) {
  const artists = [];
  album?.map((track) => {
    track.artist.map((e) => {
      if (!artists.includes(e)) {
        artists.push(e);
      }
    });
  });
  const albumName = album[0]?.album;
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{albumName + " - " + artists?.join(", ")}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`${albumName} has ${album.length} song(s)`}</p>
      </div>
      <div className="album-release">
        <p>Release Date: {album.release_date ? album.release_date : "N/A"}</p>
      </div>
    </div>
  );
}

// function AlbumInfo({ album }) {
//   console.log(album);
//   return <div></div>;
// }

export default AlbumInfo;
