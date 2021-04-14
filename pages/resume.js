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
        <div>年龄：31</div>
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
        <div>
          <div >2019.02~至今</div>
          <div >2018.07~2018.11</div>
          <div >2014.07~2018.07</div>
        </div>
        <div>
          <div>携程(&gt;2年)</div>
          <div>货车帮(4月)</div>
          <div>去哪儿(4年)</div>
        </div>
        <div>
          <div>前端工程师</div>
          <div>前端工程师</div>
          <div>前端工程师</div>
        </div>
        <div>
          <div>成都</div>
          <div>成都</div>
          <div>北京</div>
        </div>

      </div>

      <h1>项目经验</h1>
      <div className="sperate"></div>
      <div className="title">携程</div>
      <div className="item-title flex-between"><span>主导智行打车和接送机&站的开发</span><span>RN+redux</span><span>APP</span></div>
      <ul>
        <li>基于携程CRN框架注册频道号，搭建新项目</li>
        <li>封装设计redux，将actionType、action和reducer集成到一个文件中，减少查看成本，提高开发效率</li>
        <li>做新需求的同时逐步完成所有页面的重构</li>
      </ul>

      <div className="item-title flex-between"><span>主导Thor管理系统的开发</span><span>React+express</span><span>Web</span></div>
      <ul>
        <li>基于携程PaaS系统搭建新项目，解决nginx和静态路径等问题</li>
        <li>设计并搭建路由系统，通过一个数组配置页面URL、左侧导航、右侧页面、权限控制以，解析并处理此配置后合并到react-router-dom中</li>
        <li>设计并搭建node服务器，通过转发解决跨域问题，一键对接多个后端服务；通过代理解决外网穿透问题</li>
      </ul>
    </div>
  )
}

export default Resume;