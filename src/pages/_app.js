import React, { useState } from 'react'
import '../styles/css/index.css'
import Layout from '@/components/layout/Layout'
import { UserContext } from '@/contexts/UserContext'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <Layout>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </Layout>
  )
}
