import React from "react";
import "./queue.css";

function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="queue-item flex"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.title}</p>
              <p>{track?.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Queue;
