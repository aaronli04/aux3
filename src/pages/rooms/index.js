import Head from 'next/head';
import JoinComponent from '@/components/rooms/join/JoinComponent';

export default function RoomPage() {
  return (
    <>
      <Head>
        <title>
          auxparty | rooms
        </title>
      </Head>
      <JoinComponent />
    </>
  )
}