import React from 'react';
import vdopath from '../../../assets/videos/Loading.mp4'
const VideoPlayer = () => {
  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <video
        className="absolute inset-0 w-full h-screen"
        src={vdopath} // Replace with the actual path to your video file
        autoPlay={true} // Add this attribute to autoplay the video
        loop
        muted
        playsInline
        controlsList="nodownload" // Disable the download button
        controls={false} // Disable video controls
      />
    </div>
  );
};

export default VideoPlayer;
