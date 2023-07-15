import React, { useState } from 'react'
import '../styles/css/index.css'
import Layout from '@/components/layout/Layout'
import { UserProvider } from '@/contexts/UserContext';

export default function App({ Component, pageProps }) {

  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  )
}
