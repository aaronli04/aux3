import Head from 'next/head';
import ProfileComponent from '@/components/profile/ProfileComponent';

export default function LoginPage() {
    return (
      <>
        <Head>
            <title>
                aux3 | profile
            </title>
        </Head>
        <ProfileComponent />
      </>
    )
  }
  