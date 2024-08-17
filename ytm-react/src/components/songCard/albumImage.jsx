import React from "react";

import "./albumImage.css";

function AlbumImage({ image }) {
  const url = URL.createObjectURL(
    new Blob([new Uint8Array(image.data)], {
      type: "image/jpg",
    })
  );
  return (
    <div className="albumImage flex">
      <img src={url} alt="album art" className="albumImage-art" />
      <div className="albumImage-shadow">
        <img src={url} alt="shadow" className="albumImage-shadow" />
      </div>
    </div>
  );
}

export default AlbumImage;
