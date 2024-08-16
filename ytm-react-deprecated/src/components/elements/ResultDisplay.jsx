const ResultDisplay = ({ result, onTrackChange }) => {
  const onTrackClick = (track) => () => {
    console.log(`Playing track: ${track.trackid}, pid: ${track.album_id}`);
    onTrackChange(track.trackid, track.album_id);
  };

  const trackButtons =
    result && Array.isArray(result) ? (
      result.map((track) => (
        <button
          key={track.id}
          style={{ display: "block", margin: "3px 0" }}
          onClick={onTrackClick(track)}
        >
          {track.title}
        </button>
      ))
    ) : (
      <p>No tracks available</p>
    );

  return <div className="result-display">{trackButtons}</div>;
};
export default ResultDisplay;
