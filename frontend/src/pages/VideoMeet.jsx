import React from 'react'




const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
  "iceServers": [
    {"urls": "stun:stun.l.google.com:19302"}
  ]
}

const VideoMeet = () => {
  return (
    <div>VideoMeet</div>
  )
}

export default VideoMeet