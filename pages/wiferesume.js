import React from 'react';
import { NextSeo } from 'next-seo'
import '../styles/resume.less'

const Resume = props => {
  return (
    <>
      <NextSeo
        title="吴利宏简历"
      />
      <div className="wrap wife">
        <h1 className="name">吴利宏<span className="sex">(女)</span></h1>
        <h1>求职意向：护士</h1>
        <div className="info ml5">
          <div>手机：13880538313</div>
          <div>邮箱：751558907@qq.com</div>
        </div>
        <div className="info ml5">
          <div>年龄：29</div>
          <div>现居：成都市天府新区万安镇</div>
        </div>

        <h1>教育背景</h1>
        <div className="divider"></div>
        <div className="flex-between ml5">
          <div>
            <div>2014.09-2019.12</div>
            <div>2011.09-2014.06</div>
          </div>
          <div>
            <div>西南医科大学</div>
            <div>泸州医学院</div>
          </div>
          <div>
            <div>护理/<strong>本科</strong></div>
            <div>护理/<strong>专科</strong></div>
          </div>

        </div>

        <h1>工作经历</h1>
        <div className="divider"></div>
        <div className="flex-between ml5">
          <div>
            <div >2014.08~现在 (7年)</div>
          </div>
          <div>
            <div>四川锦欣妇女儿童</div>
          </div>
          <div>
            <div>护士</div>
          </div>
          <div>
            <div>成都</div>
          </div>

        </div>

        <h1>工作经验</h1>
        <div className="divider"></div>
        <ul>
          <li>负责录入各种费用，查找其他班次有无翻记，错记情况，负责医嘱审查，负责病人催款及对病人有关收费问题的解释工作。负责出院病历的质量检查及整理</li>
          <li>负责清点科室财产物品并登记签名。每周按需负责科室物品的领取、为每班做好物资准备，协助护士长做好成本控制。负责检查无菌物品的有效期及做好科室药品管理。
          负责急救车管理，抢救车及急救设备、物品、药品处于备用状态。负责科室各仪器设备的一级维护及计量监测并做好登记。
          负责检查并参与每周工休座谈会的召开</li>
          <li>指导下级护士的病人护理工作。参与实习、进修和低年资护士的带教。</li>
          <li>负责病人的治疗及整体护理工作的开展，了解科内动态，协助护士长合理安排临床护理工作。负责督促检查病人健康教育的落实，并对健康教育效果进行评价。
          指导并参与危重、技术难度大或护理风险高的病人的抢救和护理工作。参与医生查房和科室危重、疑难病人讨论，制定护理计划并组织实施。
          指导并参加护理小组的护理查房、病案讨论、护理会诊等工作，对病房和病人的问题提出可行性建议。协助护士长做好护理质量控制及病区管理工作，保证病人安全，提升优质护理服务内涵</li>
          <li>负责新入、出院、转科患者床单位的准备和整理工作，做好消毒隔离，防止交叉感染。根据患者病情需要及护理级别巡视病房，观察病情，发现问题及时汇报并处理。
          遵医嘱及时完成各项治疗和护理工作，按要求及时书写护理记录。征求患者及家属的意见及建议，及时解决患者提出的问题</li>
        </ul>

        <h1>工作技能</h1>
        <div className="divider"></div>
        <ul>
          <li><strong>护师资格证</strong></li>
          <li>掌握异常新生儿护理，如：早产儿、畸形儿等；产科危急重症病人的护理，如：早产、异常分娩、产后出血、胎盘早剥、前置胎盘、子痫前期、子痫、羊水栓塞、子宫破裂、有合并症的产科病人等。
          掌握基础护理和专科护理技能。专科会阴擦洗、坐浴、导尿、阴道检查、新生儿脐部护理，新生儿呛奶处理，听诊胎心音，胎儿电子监护，乙肝疫苗接种，新生儿沐浴、水疗、抚触、智护训练，新生儿洗胃术，
          产科术前准备、术后护理</li>
          <li>掌握产科特殊药物的作用及副作用的处理原则，如：硫酸镁、安宝、阿托西班、地塞米松、倍他米松、缩宫素、异丙嗪、地西泮、欣母佩、卡贝缩宫素、维生素K1等</li>
          <li>掌握急救基本知识和基本技能</li>
          <li>熟悉爱婴医院相关知识及母乳喂养技能，能够胜任公休座谈会的集体指导，完成每年的爱婴医院知识复训及考核</li>
        </ul>

        <h1>个人发展</h1>
        <div className="divider"></div>
        <ul>
          <li>参加上级学历教育</li>
          <li>正在积极准备主管护师的职称考试</li>
          <li>积极参加专科护士培训，每年完成继续教育学分25分（Ⅰ类5分，Ⅱ类20分）</li>
        </ul>

        <h1>自我评价</h1>
        <div className="divider"></div>
        <ul>
          <li>能遵守工作纪律，保持良好的出勤记录</li>
          <li>具有良好的工作态度，主动性、责任心和慎独精神</li>
          <li>具有团队合作精神</li>
        </ul>
      </div>
    </>
  )
}

export default Resume;