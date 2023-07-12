import styles from '../styles/css/index.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} style={styles} />
}
