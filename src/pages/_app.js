import React from 'react'
import '../styles/css/index.css'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }) {

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}
