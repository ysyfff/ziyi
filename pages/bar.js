import React, { useEffect } from 'react';
import { Button } from 'antd'

export default (props) => {
  useEffect(()=>{
    window.onpopstate = function (e) {
      alert('2334')
    }
  },[])
  return (
    <div>
      Bar
    </div>
  )
}