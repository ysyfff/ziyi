import React, { useState, useEffect, useRef, useCallback } from 'react';
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import '../styles/clock.less'

const AutoplaySlider = withAutoplay(AwesomeSlider)

const imgs = [
  // "https://up.enterdesk.com/edpic_360_360/27/8f/93/278f938be4b460a57962d542eee989f6.jpg",
  // "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",
  "/smile.jpeg",
  "/clothes.jpeg",
];

const videos = [
  "/bed.mp4",
  "/smile2.mp4"
]

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
  
  const changeTheme = ()=>{
    const el = document.querySelectorAll('.awssld__content');
    console.log(el, 'gg')
    el.forEach((element)=>{
      console.log(el, 'ggi')
      element.classList.add(`awssld__content-${theme}`)
    })
  };

  useEffect(()=>{
    changeTheme()
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(hours())
      setMinute(minutes())
      setSecond(seconds())
    }, 500)

    changeTheme();

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
        {/* <div className="space"></div> */}
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={15*1000}
          media={imgs.map(item => ({ source: item })).concat(videos.map(item => ({
            children: (<video
              src={item}
              type="video/mp4"
              controls
              autoPlay
              loop
            />)})))}
          animation="foldOutAnimation"
          onTransitionStart={()=>{
            changeTheme()
          }}
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
        <div className="second">{second}</div>
      </div>
    </div>
  )
}

export default Clock;