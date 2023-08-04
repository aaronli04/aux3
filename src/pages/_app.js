import React, { useEffect } from 'react'
import '../styles/css/index.css'
import Layout from '@/components/layout/Layout'
import { createUserId } from '@/utils/userId'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    createUserId()
  }, [])

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}