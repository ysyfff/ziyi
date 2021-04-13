import React from 'react';
import '../styles/resume.less'

const Resume = props => {
  return (
    <div className="wrap">
      <h1 >尹士勇(男)</h1>
      <h1>求职意向：前端工程师</h1>
      <div className="info">
        <div>手机：18810961061</div>
        <div>邮箱：braveyin168@outlook.com</div>
      </div>
      <div className="info">
        <div>出生：1989.05</div>
        <div>现居：成都市天府新区</div>
      </div>

      <h1>教育背景</h1>
      <div className="sperate"></div>
      <div className="flex-between">
        <div>2010.09~2014.07</div>
        <div>西南科技大学</div>
        <div>计算机科学与技术/<strong>本科</strong></div>
      </div>

      <h1>工作经历&middot;7年</h1>
      <div className="sperate"></div>
      <div className="flex-between">
        <div style={{width: 125}}>2019.02~至今</div>
        <div style={{width: 85}}>携程(>2年)</div>
        <div>前端工程师</div>
        <div>成都</div>
      </div>
      <div className=" flex-between">
        <div style={{width: 125}}>2018.07~2018.11</div>
        <div style={{width: 85}}>货车帮(4月)</div>
        <div>前端工程师</div>
        <div>成都</div>
      </div>
      <div className=" flex-between">
        <div style={{width: 125}}>2014.07~2018.07</div>
        <div style={{width: 85}}>去哪儿(4年)</div>
        <div>前端工程师</div>
        <div>北京</div>
      </div>

      <h1>项目经验</h1>
      <div className="sperate"></div>
      <div className="title">携程</div>
      <div className="item-title"><strong>主导智行打车和接送机&站的开发(RN+redux)</strong></div>
      <ul>
        <li>基于携程CRN框架注册频道号，搭建新项目</li>
        <li>封装设计redux，将actionType、action和reducer集成到一个文件中，减少查看成本，提高开发效率</li>
        <li>做新需求的同时逐步完成所有页面的重构</li>
      </ul>

      <div className="item-title"><strong>主导Thor管理系统的开发(React+antd)</strong></div>
      <ul>
        <li>基于携程Pass系统搭建新项目，解决nginx和静态路径等问题</li>
        <li>设计并搭建路由系统与导航栏</li>
        <li>设计并搭建node代理服务，一键对接多个后端服务，解决跨域问题</li>
      </ul>
    </div>
  )
}

export default Resume;