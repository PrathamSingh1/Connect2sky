import React, { useEffect, useRef, useState } from 'react'
import "../styles/VideoComponent.css"
import { io } from 'socket.io-client';



const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
  "iceServers": [
    {"urls": "stun:stun.l.google.com:19302"}
  ]
}

const VideoMeet = () => {

  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);
 
  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModel, setShowModel] = useState();

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(0);

  let [askForUsername, setAskForUsername] = useState(true)

  let [username, setUsername] = useState("");

  const videoRef = useRef([])

  let [videos, setVideos] = useState([]);


  // TODO

  // if(isChrome() === false) {

  // }


  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({video: true})

      if(videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }
      
      const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true})

      if(audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if(navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if(videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable, audio: audioAvailable});

        if(userMediaStream) {
          window.localStream = userMediaStream;
          if(localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPermissions();
  }, [])


  let getUserMediaSuccess = (stream) => {

  }

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({video: video, audio: audio})
      .then(getUserMediaSuccess)    // Todo getUserMediaSuccess
      .then((stream)=>{})
      .catch((e) => console.log(e))
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop())
      } catch(e) {

      }
    }
  }

  useEffect(() => {
    if(video != undefined && audio != undefined) {
      getUserMedia();
    }
  }, [audio, video])


  let gotMessageFromServer = (fromId, message) => {
    
  }

  // Todo addMessage

  let addMessage = () => {

  }

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false })

    socketRef.current.on('signal', gotMessageFromServer)

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href)

      socketIdRef.current = socketRef.current.id

      socketRef.current.on("chat-message", addMessage)

      socketRef.current.on("user-left", (id)=> {
        setVideo((video) => video.filter((video)=>video.socketId !== id))
      })

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
          
          connections[socketListId].onicecandidate = (event) => {
            if(event.canditate !== null) {
              socketRef.current.emit("signal", socketListId, JSON.stringify(({'ice': event.canditate})))
            }
          }
        })
      })
    })
  }

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    connectToSocketServer();
  }

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  }

  return (
    <div className='videoMeet'>
      {askForUsername === true ? 
      <div className='videoMeet'>
        <h2>Enter into Lobby</h2>
        <input className='border' type="text" label="Username" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={connect} className='bg-blue-500 text-white p-2 rounded-[15px] cursor-pointer m-4'>Connect</button>

        <div className='w-[800px]'>
          <video ref={localVideoRef} autoPlay muted></video>
        </div>
      </div> : <></>
    }
    </div>
  )
}

export default VideoMeet