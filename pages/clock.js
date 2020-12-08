import React, { useState, useEffect, useRef } from 'react';
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import '../styles/clock.less'

const AutoplaySlider = withAutoplay(AwesomeSlider)

const imgs = [
  "/smile.jpeg",
  "/clothes.jpeg",
];

const fix0 = (str) => {
  if (+str < 10) {
    return `0${str}`
  }
  return str;
}

const hours = () => {
  return fix0(new Date().getHours())
}

const minutes = () => {
  return fix0(new Date().getMinutes())
}

const seconds = () => {
  return fix0(new Date().getSeconds())
}

const Clock = (props) => {
  const [hour, setHour] = useState(hours())
  const [minute, setMinute] = useState(minutes())
  const [second, setSecond] = useState(seconds())
  const [theme, setTheme] = useState('gold') // gold 2
  

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(hours())
      setMinute(minutes())
      setSecond(seconds())
    }, 500)

    // let i = 0;
    // const clr = setInterval(()=>{
    //   i++;
    //   setTheme(['gold', '2'][i%2])
    // }, 2000)

    return () => {
      clearInterval(timer)
      // clearInterval(clr)
    }
  }, [])

  const dotCls = `dot dot-${theme}`
  return (
    <div className={`wrapper wrapper-${theme}`}>
      <div className={`videos`}>
        <div className="space"></div>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={30000}
          media={imgs.map(item => ({ source: item }))}
          animation="foldOutAnimation"
          cssModule={[
            CoreStyles, AnimationStyles
          ]}
        >
        </AutoplaySlider>
      </div>
      <div className={`clock clock-${theme}`}>
        <div className="hour">{hour}</div>
        <div className="dot-wrap">
          <div className={dotCls}></div>
          <div className={dotCls}></div>
        </div>
        <div>{minute}</div>
        <div className="dot-wrap">
          <div className={dotCls}></div>
          <div className={dotCls}></div>
        </div>
        <div>{second}</div>
      </div>
    </div>
  )
}

export default Clock;