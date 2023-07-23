import Head from 'next/head';
import CallbackComponent from '@/components/callback/CallbackComponent';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          auxparty | callback
        </title>
      </Head>
      <CallbackComponent />
    </>
  )
}
