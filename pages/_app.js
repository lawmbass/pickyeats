import '../styles/globals.css'
import { makeServer } from '../server'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
