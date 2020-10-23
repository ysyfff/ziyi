import React, {useEffect} from 'react';
import {Button} from 'antd'

export default (props) => {

  useEffect(()=>{run()}, [])
  const run = ()=>{
    window.onpopstate = function (e) {
      alert('2333')
    }
    // let stateObj = {
    //   foo: "bar",
    // };

    // history.pushState(stateObj, "page 2", "bar");
  }
  return(
    <div>
      <Button onClick={run}>RUN</Button>
    </div>
  )
}