import React, { useState, useEffect, useRef, useCallback } from 'react';
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import dayjs from 'dayjs'
import '../styles/clock.less'

const AutoplaySlider = withAutoplay(AwesomeSlider)


const medias = [
  "/smile.jpeg",
  "/bed.mp4",
  "/clothes.jpeg",
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

const createMedia = ()=>{
  return medias.map(item=>{
    if(item.match(/\.(mp4|webm)/)){
      return {
        children: (
          <video
            src={item}
            type="video/mp4"
            controls
            autoPlay
            loop
          />
        )
      }
    }else{
      return {
        source: item
      }
    }
  })
}

const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const Clock = (props) => {
  const [hour, setHour] = useState(hours())
  const [minute, setMinute] = useState(minutes())
  const [second, setSecond] = useState(seconds())
  const [theme, setTheme] = useState('gold') // gold 2
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [week, setWeek] = useState(weeks[dayjs().format('d')])

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

    const timer2 = setInterval(()=>{
      setDate(dayjs().format('YYYY-MM-DD'))
      setWeek(weeks[dayjs().format('d')])
    }, 5 * 60 * 1000)

    changeTheme();

    // let i = 0;
    // const clr = setInterval(()=>{
    //   i++;
    //   setTheme(['gold', '2'][i%2])
    // }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(timer2)
      // clearInterval(clr)
    }
  }, [])

  const dotCls = `dot dot-${theme}`
  return (
    <div className={`wrapper wrapper-${theme}`}>
      {/* media */}
      <div className={`videos`}>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={15*1000}
          media={createMedia()}
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
      {/* clock */}
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

      {/* date */}
      {/* <div className={`date date-${theme}`}>
        {date}
      </div> */}
      {/* week */}
      <div className={`week week-${theme}`}>
        {date} {week}
      </div>
    </div>
  )
}

export default Clock;