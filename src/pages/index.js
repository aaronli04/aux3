import Head from 'next/head';
import HomeComponent from "@/components/home/HomeComponent";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          auxparty
        </title>
      </Head>
      <HomeComponent />
    </>
  )
}
