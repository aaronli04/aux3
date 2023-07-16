import Head from 'next/head';
import CallbackComponent from '@/components/callback/CallbackComponent';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          aux3 | callback
        </title>
      </Head>
      <CallbackComponent />
    </>
  )
}
