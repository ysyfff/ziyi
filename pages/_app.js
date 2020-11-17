import React, {useEffect} from 'react';
import '../styles/globals.css'
import '../styles/antd.less';
import sw from '../utils/sw.js';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.register('../service-worker.js');
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
