import React, {useEffect} from 'react';
import '../styles/globals.css'
import '../styles/antd.less';
import sw from '../utils/sw.js';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    sw();
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
