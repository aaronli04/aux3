import Head from 'next/head';
import PageNotFoundComponent from '@/components/404/PageNotFoundComponent';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>
          Page not found
        </title>
      </Head>
      <PageNotFoundComponent />
    </>
  )
}
