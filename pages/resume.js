import React from "react";
import { NextSeo } from "next-seo";
import "../styles/resume.less";

const Resume = (props) => {
  return (
    <>
      <NextSeo title="尹士勇-前端工程师-简历" />
      <div className="wrap">
        <div className="qr-code">
          {/* <div className="qr-resume">
            <img src="/resume.png" />
          </div> */}
          <div className="qr-blog">
            <img src="/blog.png" />
          </div>
        </div>

        <h1 className="name" style={{ height: "2rem", lineHeight: "2rem" }}>
          尹士勇<span className="sex">(男)</span>
        </h1>
        <h1>求职意向：前端工程师</h1>
        {/* <div className="info ml5">
        <div>手机：18810961061</div>
        <div>邮箱：braveyin168@outlook.com</div>
      </div>
      <div className="info ml5">
        <div>年龄：31</div>
        <div>现居：成都市天府新区</div>
      </div> */}
        <div className="flex-between">
          <div>
            <div>手机：18810961061</div>
            <div>学历：本科</div>
          </div>
          <div>
            <div>邮箱：braveyin@126.com</div>
            <div>现居：成都市天府新区</div>
          </div>
        </div>

        <h1>技术能力</h1>
        <div className="divider"></div>
        <ul>
          <li>
            精通 HTML、CSS、JavaScript、<strong>React</strong>、React Native 等
          </li>
          <li>
            熟悉 webpack、<strong>next.js</strong>
            、vue、Flutter、http、node、shell 等
          </li>
          {/* <li>英语CET4</li> */}
        </ul>

        <h1>项目经历</h1>
        <div className="divider"></div>
        <div className="title ml5">携程</div>
        <div className="item-title flex-between">
          <span>主导智行打车和接送机&站的开发</span>
          {/* <span>RN+redux</span>
          <span>APP</span> */}
        </div>
        <ul>
          <li>基于携程CRN框架注册频道号，搭建新项目</li>
          <li>
            封装设计redux，将actionType、action和reducer集成到一个文件中，减少查看成本，提高开发效率
          </li>
          <li>做新需求的同时逐步完成所有页面的重构</li>
          <li>完成2次RN大版本的升级</li>
        </ul>
        <div className="item-title flex-between">
          <span>主导Thor管理系统的开发</span>
          {/* <span>React+express</span>
          <span>Web</span> */}
        </div>
        <ul>
          <li>基于携程PaaS系统搭建新项目，解决nginx和静态路径等问题</li>
          <li>
            设计并搭建路由系统，通过数组配置自动处理页面URL、左侧导航、右侧页面、权限控制和面包屑等
          </li>
          <li>
            设计并搭建node服务器，通过转发解决跨域问题，一键对接多个后端服务；通过代理解决外网穿透问题
          </li>
        </ul>
        <div className="item-title flex-between">
          <span>包车微信和支付宝等小程序的开发</span>
          {/* <span>原生开发</span>
          <span>小程序</span> */}
        </div>
        <div className="item-title flex-between fwnormal">
          <span>包车RN项目的开发</span>
          {/* <span>RN+redux</span>
          <span>APP</span> */}
        </div>
        <div className="item-title flex-between fwnormal">
          <span>包车H5项目的开发</span>
          {/* <span>React+next</span>
          <span>H5</span> */}
        </div>
        <div className="item-title flex-between fwnormal">
          <span>Flash项目的开发</span>
          {/* <span>Vue+nuxt</span>
          <span>H5</span> */}
        </div>

        <div className="divider-sub"></div>

        <div className="title">货车帮</div>
        <div className="item-title flex-between fwnormal">
          <span>公铁项目救急</span>
          {/* <span>React+dva</span> */}
          <span>Web</span>
        </div>
        <ul>
          <li>
            入职后发现此项目工作量大且时间紧，当即向产品经理和项目经理风险报告
          </li>
          <li>
            在争取一定时间后，大家齐心协力做此项目，最终按照新的时间点成功上线
          </li>
        </ul>
        <div className="item-title flex-between fwnormal">
          <span>甩挂项目攻坚</span>
          {/* <span>React+dva</span> */}
          <span>Web</span>
        </div>
        <ul>
          <li>
            复杂的配载计算逻辑集中在前端(在一个table中涉及到了重量、体积、价格、已配载量、剩余量、添加和删除物品等诸多联动逻辑)
          </li>
          <li>
            负责这块的组员在开发的过程中总是出现计算错误的问题，发现其对这里的逻辑没有整理清楚，且写的代码耦合度很高
          </li>
          <li>
            帮助其从头梳理了逻辑并对代码进行了解耦，这个复杂的联动计算就迎刃而解了
          </li>
        </ul>

        <div className="divider-sub"></div>

        <div className="title">去哪儿</div>
        <div className="item-title flex-between">
          <span>主导智能酒店管理系统的开发</span>
          {/* <span>React+mobx</span> */}
          <span>Web</span>
        </div>
        <ul>
          <li>优化前端编译打包工具packing，根据文件路径自动生成页面url</li>
          <li>设计搭建node服务器，处理socket，完成页面信息的推送</li>
          <li>
            设计开发npm包q-antd，把antd和mobx糅合到一起(重点改造Form表单)，开发起来像Vue一样
          </li>
        </ul>
        <div className="item-title flex-between">
          <span>供应链系统主力开发</span>
          {/* <span>avalon+Oniui</span> */}
          <span>Web</span>
        </div>
        <ul>
          <li>
            使用avalon零失误重构近20个jQuery页面，其中包含了逻辑复杂的列表页等页面，提高了后续的开发效率
          </li>
          <li>
            设计开发trim.js，将对象中的所有值进行trim，在http发出请求的时候做收口统一处理
          </li>
          <li>
            设计开发任务模板系统，提高运营效率100%，省50%成本，获年度优秀项目奖(奖金1万元)
          </li>
        </ul>
        <div className="item-title flex-between">
          <span>再出发系统的主力开发</span>
          {/* <span>avalon+Oniui</span> */}
          <span>Web</span>
        </div>
        <ul>
          <li>
            设计开发grunt-i19n插件，解放中英繁三种字体配置的重复劳动，提高效率
          </li>
        </ul>
        <div className="item-title flex-between">
          <span>酒店移动版的开发</span>
          {/* <span>React</span> */}
          <span>H5</span>
        </div>
        <ul>
          <li>
            酒店业务华为对接，协调团结10多个小组近30人，推动项目的发展，按时成功上线
          </li>
        </ul>
        <div className="item-title flex-between fwnormal">
          <span>再出发公众号的开发</span>
          {/* <span>avalon+Oniui</span> */}
          <span>公众号</span>
        </div>

        <h1>教育背景</h1>
        <div className="divider"></div>
        <div className="flex-between ml5">
          <div>2010.09~2014.07</div>
          <div>西南科技大学</div>
          <div>
            计算机科学与技术
            {/* / <strong>本科</strong> */}
          </div>
        </div>

        <h1>工作经历</h1>
        <div className="divider"></div>
        <div className="flex-between ml5">
          <div>
            <div>2019.02~现在</div>
            <div>2018.07~2018.11</div>
            <div>2014.07~2018.07</div>
          </div>
          <div>
            <div>携程</div>
            <div>货车帮</div>
            <div>去哪儿</div>
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

        <h1>个人作品</h1>
        <div className="divider"></div>
        <ul>
          <li>
            <div className="flex-between">
              <span>博客</span>
              <a href="https://blog-ysy.vercel.app/" target="_blank">
                blog-ysy.vercel.app
              </a>
            </div>
          </li>
          <li>
            <div className="flex-between">
              <span>会员管理系统(离线化)</span>
              <a href="https://ziyi.vercel.app/" target="_blank">
                ziyi.vercel.app
              </a>
            </div>
          </li>
        </ul>

        <h1>个人评价</h1>
        <div className="divider"></div>
        {/* <div>7年资深前端开发，具备<span style={{ fontWeight: 'bold' }}>全栈开发</span>的能力，具有Web端和移动端开发的雄厚实力，热爱折腾与学习</div> */}
        <ul>
          <li>
            <span style={{ fontWeight: "bold" }}>全栈工程师</span>
            ，7年资深前端开发，具有4年Web和3年移动开发经验，具备后端开发能力
          </li>
          <li>能独当一面，曾3次主导中型项目的设计与开发</li>
          <li>希望通过本人丰富的经验和优秀的代码为公司提供高质量的产品</li>
        </ul>
        <div className="qr-code"></div>
      </div>
    </>
  );
};

// https://www.zhihu.com/question/23150301

export default Resume;
