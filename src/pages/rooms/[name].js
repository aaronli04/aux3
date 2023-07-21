import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import RoomComponent from '@/components/rooms/RoomComponent';

export default function RoomPage() {
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const paramsArray = pathname.split('/');
      setRoomName(paramsArray[paramsArray.length - 1]);
    }
  }, []);

  return (
    <>
      <Head>
        {roomName && (
          <title>
            aux3 | {roomName}
          </title>
        )}
      </Head>
      <RoomComponent />
    </>
  )
}
