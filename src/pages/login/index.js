import Head from 'next/head';
import LoginComponent from "@/components/login/LoginComponent";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          auxparty | login
        </title>
      </Head>
      <LoginComponent />
    </>
  )
}
