import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/socketProvider'

export default function RoomPage() {

  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null)

  const handelUserJoined = useCallback(({ email, id }) => {
    console.log(`Email: ${email} joined the room`);
    setRemoteSocketId(id)
  }, [])

  useEffect(() => {
    socket.on("user:joined", handelUserJoined)

    return () => {
      socket.off("user:joined", handelUserJoined)
    }
  }, [socket, handelUserJoined])
  return (
    <div>
      <h1>RoomPage</h1>
      <h4>
        {remoteSocketId ? 'Connected' : 'No one in room'}
      </h4>
    </div>

  )
}
