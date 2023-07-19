import React, { useEffect } from 'react'
import '../styles/css/index.css'
import Layout from '@/components/layout/Layout'
import { createUserID } from '@/utils/cookies'
import { localStorageSet } from '@/utils/localStorage'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let user = createUserID()
    localStorageSet('user-id', user)
  }, [])

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}
