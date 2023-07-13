import Head from 'next/head';
import LoginComponent from '@/components/login/LoginComponent';

export default function LoginPage() {
    return (
      <>
        <Head>
            <title>
                aux3 | login
            </title>
        </Head>
        <LoginComponent />
      </>
    )
  }
  