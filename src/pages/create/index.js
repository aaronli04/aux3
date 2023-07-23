import Head from 'next/head';
import CreateComponent from "@/components/create/CreateComponent";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          auxparty | create
        </title>
      </Head>
      <CreateComponent />
    </>
  )
}
