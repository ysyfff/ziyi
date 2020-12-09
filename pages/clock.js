import React, { useState, useEffect, useRef, useCallback } from 'react';
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import dayjs from 'dayjs'
import axios from 'axios'
import jsonp from 'axios-jsonp'
import '../styles/clock.less'

const AutoplaySlider = withAutoplay(AwesomeSlider)


const medias = [
  "/smile.jpeg",
  "/bed.mp4",
  "/clothes.jpeg",
  "/smile2.mp4"
]

const bigDate = {
  '03-07': '尹芊雪生日快乐',
  '08-08': '结婚纪念日快乐',
  '03-11': '这一天和媳妇第一次见面',
  '07-24': '老波大人生日快乐',
  '05-26': '我自己的生日快乐'
}

const createMedia = () => {
  return medias.map(item => {
    if (item.match(/\.(mp4|webm)/)) {
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
    } else {
      return {
        source: item
      }
    }
  })
}

const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const addVideo = (data)=>{
  const v = document.createElement('video')
  v.src = data.tts;
  v.autoplay = true;
  v.type = "video/mp4"
  v.classList.add('one-word-video');
  document.querySelector('body').appendChild(v);
}

const removeVideo = ()=>{
  document.querySelector('.one-word-video').remove()
}

const Clock = (props) => {
  const [hour, setHour] = useState(dayjs().format('HH'))
  const [minute, setMinute] = useState(dayjs().format('mm'))
  const [second, setSecond] = useState(dayjs().format('ss'))
  const [theme, setTheme] = useState('gold') // gold 2
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [week, setWeek] = useState(weeks[dayjs().format('d')])
  const [oneWord, setOneWord] = useState({});

  const getOneWord = async () => {
    // const rst = await axios.get('http://open.iciba.com/dsapi/');
    const rst = await axios({
      url: 'http://open.iciba.com/dsapi/',
      adapter: jsonp,
    });
    const { sid, tts, content, note, picture } = rst.data;
    if (sid !== oneWord.sid) {
      setOneWord({
        tts, content, note, picture, sid
      })
    }
    addVideo(rst.data)
  }

  const changeTheme = () => {
    const el = document.querySelectorAll('.awssld__content');
    el.forEach((element) => {
      element.classList.add(`awssld__content-${theme}`)
    })
  };

  useEffect(() => {
    changeTheme()
  }, [theme])

  useEffect(() => {
    // 获取每日一言
    getOneWord();

    const timer = setInterval(() => {
      setHour(dayjs().format('HH'))
      setMinute(dayjs().format('mm'))
      setSecond(dayjs().format('ss'))
    }, 500)

    const timer2 = setInterval(() => {
      setDate(dayjs().format('YYYY-MM-DD'))
      setWeek(weeks[dayjs().format('d')])
    }, 5 * 60 * 1000)

    const timer3 = setInterval(() => {
      getOneWord();
    }, 4 * 60 * 60 * 1000);

    // 每隔一小时播报每日一言语音
    const timer4 = setInterval(() => {
      removeVideo()
      addVideo(oneWord)
    },60 * 60 * 1000);

    changeTheme();

    // let i = 0;
    // const clr = setInterval(()=>{
    //   i++;
    //   setTheme(['gold', '2'][i%2])
    // }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(timer2)
      clearInterval(timer3)
      clearInterval(timer4)
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
          interval={15 * 1000}
          media={createMedia()}
          animation="foldOutAnimation"
          onTransitionStart={() => {
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
      <div className={`date date-${theme}`}>
        <img src={oneWord.picture} />
        <div className={`one-word one-word-${theme}`}>
          <div>
            {oneWord.note}
          </div>
          <div>
            {oneWord.content}
          </div>
        </div>
      </div>
      {/* week */}
      <div className={`week week-${theme}`}>
        {date} {week}
      </div>
    </div>
  )
}

export default Clock;