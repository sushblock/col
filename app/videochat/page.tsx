'use client'

import React, { useState } from 'react'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import 'agora-react-uikit/dist/index.css'

export default function page() {
  const [videocall, setVideocall] = useState(true)
  const [isHost, setHost] = useState(true)
  const [isPinned, setPinned] = useState(false)
  const [username, setUsername] = useState('')

  const agoraAppID = "64eb1a738a3a4b538442a44651acc84b"//process.env.NEXT_AGORA_APPID || "64eb1a738a3a4b538442a44651acc84b";

  console.log(`agoraAppID: ${agoraAppID}`);

  return (
    <div className="w-screen h-screen flex bg-[#007bff22]">
      <div className="flex flex-col flex-1">
        <h1 className="text-center mb-0">Agora React Web UI Kit</h1>
        {videocall ? (
          <>
            <div className="flex justify-around">
              <p className="text-lg w-[200px]">
                You're {isHost ? 'a host' : 'an audience'}
              </p>
              <p className="bg-[#007bff] cursor-pointer border-r-5 px-1 py-2 text-white text-sm" onClick={() => setHost(!isHost)}>
                Change Role
              </p>
              <p className="bg-[#007bff] cursor-pointer border-r-5 px-1 py-2 text-white text-sm" onClick={() => setPinned(!isPinned)}>
                Change Layout
              </p>
            </div>
            <AgoraUIKit
              rtcProps={{
                appId: agoraAppID?agoraAppID:"",
                channel: 'col-1',
                token: null, // add your token if using app in secured mode
                role: isHost ? 'host' : 'audience',
                layout: isPinned ? layout.pin : layout.grid,
                enableScreensharing: true
              }}
              rtmProps={{ username: username || 'user', displayUsername: true }}
              callbacks={{
                EndCall: () => setVideocall(false)
              }}
            />
          </>
        ) : (
          <div className="flex justify-around">
            <input
              className="flex h-6 self-center"
              placeholder='nickname'
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <h3 className="bg-[#007bff] cursor-pointer border-r-5 px-1 py-2 text-white text-sm" onClick={() => setVideocall(true)}>
              Start Call
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}