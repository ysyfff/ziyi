import React from 'react'
import '../styles/hospital.less'

const Three = () => {
  return (
    <div style={{ width: '40%' }}></div>
  )
}
export const Header = () => {
  return (
    <div >
      <div style={{ height: '15mm', overflow: 'hidden', marginBottom: '3mm', display: 'flex' }}>
        <div style={{ marginTop: 12, marginLeft: -9 }}>
          <img src='http://pic.pc6.com/up/2015-9/2015922163050.png' style={{ width: '15mm', height: '15mm' }} />
        </div>
        <div style={{ marginTop: 25, lineHeight: 1.1, marginLeft: -5 }}>
          <div style={{ fontSize: 8, letterSpacing: '-0.5px' }}>SICHUAN CANCER HOSPITAL</div>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '1px' }}>四川肿瘤医院</div>
        </div>
      </div>
      <div style={{ fontSize: 22, textAlign: 'center' }}>
        出院证明书
      </div>
      <div>
        <span style={{ paddingRight: 60 }}>姓名:吴志明</span> <span style={{ paddingRight: 60 }}>病区:肝胆胰外科病区新</span> <span style={{ paddingRight: 60 }}>床号:40</span> 病案号:413719
      </div>
      <div style={{borderBottom: '2px solid #222'}} >
      </div>

    </div>
  )
}

const Hospital = props => {
  const a = 1;
  return (
    <div>
      {a == 1 && <div style={{ width: '170mm', height: '297mm',  margin: '0 auto', fontWeight: 500, fontSize: 13 }}>
        <div style={{ height: '' }}>
          <Header />
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>姓名:吴志明</div>
            <div style={{ width: '40%' }}>性别: 男 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年龄: 75岁</div>
            <div style={{ width: '20%' }}>X片: --</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>现住址(或工作单位):四川省仁寿县文宫镇骑龙街3号 </div>
            <div style={{ width: '40%' }}>&nbsp;</div>
            <div style={{ width: '20%' }}>病检号:--</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>身份证号:511121194603188898</div>
            <div style={{ width: '40%' }}>联系电话:18080171843</div>
            <div style={{ width: '20%' }}>CT号: </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>入院日期:2021-12-02</div>
            <div style={{ width: '40%' }}>出院日期:2021-12-23</div>
            <div style={{ width: '20%' }}>&nbsp;</div>
          </div>
          <div>
            出院诊断:1.胆总管肿瘤伴胆管内肿瘤、神经侵犯2梗阻性黄疸3.肝功能不全4,细菌性肺炎5.胰腺手术后胰腺炎6.低蛋白血症7.血糖升高待诊8.双肾囊肿9.电解质素乱10.重度营养不良1L,疼12.贫血13.胃德留14.胃食管少量反流
          </div>
          <div>
            扼要病情及治疗经过:
          </div>
          <div>
            患者吴志明,男75岁因”纳差10+天”于2021-12-02第1次入院,查体一般情况可，生命体征平稳，神志清楚。皮肤及巩膜重度黄染，全身浅表淋巴结未扪及肿大。双肺呼吸音清晰，双肺未闻及干湿性啰音。腹平软，无压痛及反跳痛，肝脾筋下未扪及，腹部未扪及肿块，移动性渔音阴性，Murphy征阴性，肠鸣音正常，双下般无水肿、辅助检查:我院CT提示(2021-11-29):胆总管局部不规则增厚，较厚处约0.8cm，累及长径3.0cm，致以上胆总管、肝内外胆管及胆囊明显积液扩张。肝胃间隙、肝门区及腹膜后多发小及稍大淋巴结，最大约
            1.0cm。提示:胰头占位，胆总管局部不均匀增厚，不考虑肿瘤性病变，肝胃问隙多发小及稍大淋巴结，双肾囊肿。
          </div>
          <div>
            患者入院后完善相关检查，并予以保肝、 处液对症支持等治疗，一般情况有所改善，CT双肺散在
            少许炎性斑片条索影，左胂下叫部分支 开内外胆管扩张，胆囊体积增大，请结合腹部检
            查。MR，胆总管及邻近胆囊管管壁不均 ，胆管肿瘤可能;致以上胆总管、肝内外胆管及
            胆囊明显积液扩张;胰头稍显饱满; 青结合临床，开面鹿障 肝门区及腹膜后多发小及稍大淋巴结，随诊。
            双肾囊肿。血常规(静脉血):白细胞 010 白126(g/L)，血小板数日204(10^9/L):生化
            一:总胆红素313.9(umo1/1.)，直接 红 230.3(tmo1 间接胆红素83.6(umo1/1)，总蛋56.9(g/L)，白蛋白 34.2(g/L)，前白蛋白64、2(mg(1),芮戴酸氨基转移酶 51(U/L)，门冬氨酸氨基转移酶 41 U/L)，Y-谷氨酰基转移酶697(U/L)，5核苷酸酶27.6(U/L)，碱性磷酸酶356(U/L)， -L-岩藻糖苷酶55.4(U/L)，尿素2.72(mmo1/L)，尿酸171(umo1/L)，甘油三酯4.32(mmol/L);AFP+CA19-9:甲胎蛋白
            4.72(ng/ml)，糖类抗原19-919.37(U/ml); 输血前检查:乙肝表面抗体定量(发光法)29.98(mIU/ml);热休克蛋白90a:热休克蛋白90a33.30(ng/ml);胸苷激酶1(TK1):胸苷激酶1108(PM);向患者及家属交代病情，选择手术治疗，有手术指征，无明显手术禁忌，经相关准备，于2021.12.8在手术室全麻下行胰十二指肠切除、胆囊切除、胆管成型修补、下腔静脉修补术。术中见腹腔无明显积液，手术过程中有少许渗出:腹腔粘连。以肝门区、胆囊周围、十二指肠周围为主:肝脏呈胆汁淤积性改变;胆总管占位。约
            3.0*2.0cm大小，质硬，边界不明显，胆囊管汇入胆总管处质硬，胆总管上段、肝总管及肝内胆管明显扩张，区域多发肿大淋巴结;余腹腔未见确切转移表现。手术行胰十二指肠切除、胆囊切除、胆管成型修补、下腔静脉修补术，手术过程顺利，术中留置胆肠吻合口引流管1根，胰肠吻合口引流管1根。术中出血约
            100ml，未输血。因患者超高龄病员且手术大、术中出现室上性心动过速，故术后患者返ICU。转回病房后了以监护、吸氧、止血、保肝、抗肿瘤、增强免疫、抑制胃酸、抗感染及补液对症支持等治疗，各引流管加强护理，注意监测控制血糖血压，患者胰腺手术后胰腺炎，予以禁食、生长抑素控制胰腺炎、营养支持及对治疗情况改善;患者发热，咳嗽咳痰，黄色粘痰，肺部感染重;予以加强抗感染及化痰对症治疗，并指导患者咳痰，机械排痰，雾化吸入等治疗后情况改善:患者术后禁食、营养不良、电解质素乱、疼痛。加强对治疗，营养支持治疗，注意补充电解质，情况逐渐改善:患者血糖高，加强监测控制;患者肝功能异常，低蛋白血症，予以加强保肝治疗，并使用人血白蛋白治疗后情况逐渐改善:患者恢复情况可，现患者般情可，生命体征平稳，未诉特殊不适，切门愈合可。已拆线，2021-12-16常规检查,诊断结果:1、&lt;十二肠及胆囊&gt;查见中一低分化腺肿瘤，部分为粘液腺肿瘤。肿瘤累及胆胰开口处胆管及周围胆管;可见脉管内肿瘤:神经侵犯易见:送检胰腺实质未见确切癌累及;送检胆囊见囊壁纤维增厚，未见确切癌累及:送检“胃切缘”“十二指肠切缘”及“胰腺切缘”未见确切癌累及;送检“十二指肠周围淋巴结”2枚
          </div>
        </div>
        <div style={{borderBottom: '2px solid #222'}} />
        <div style={{ textAlign: 'center' }}>第1页</div>
      </div>}

      {a!=1 && <div style={{ width: '170mm', height: '297mm',  margin: '0 auto', fontWeight: 500, fontSize: 13 }}>
        <div style={{ height: '278mm' }}>
          <Header />
          <div>
            及“胃周脂肪内淋巴结”1枚，早反应性增生。2、&lt;大网膜&gt;未见确切癌累及。3、&lt;肝总A旁淋巴结&gt;4枚，早反应性增生。4、&lt;胰腺上缘组织&gt;送检为7枚淋巴结，呈反应性增生。5、&lt;下腔V旁淋巴结&gt;1枚。早反应性增生。向患者及家属交代病情，今日要求出院。
            <div style={{ fontWeight: 700, color: '#000' }}>

              自费使用药物:琥珀酰明胶、钠钾镁钙葡萄糖、人血白蛋白、艾司奥美拉唑钠、氨溴索、多烯磷脂酰胆碱、丁二磺酸腺苷蛋氨酸、异甘草酸美、生长抑素、丙氨酰谷氨酰胺、盐酸昂丹司琼、重组人碱性成纤维细胞生长因子、复方氨基酸注射液(15)双、复合磷酸氢钾、结构脂肪乳、w3鱼油脂肪乳、雷贝拉唑钠、盐酸溴己新
            </div>
            <div>
              出院医嘱:1、注意休息，合理膳食，预防感冒，注意监测控制血糖;2、门诊随诊，每周复查血常规及生化，不适及时就诊，定期复查，科室电话028-85420845;3、院外继续治疗;4、注意加强腹腔引流管护理保持通畅，预防感染及脱落;定期更换引流袋，及时复查根据情况拔管;5、3周左右返院进一步治疗
            </div>
            <div style={{ display: 'flex' }}><div style={{ width: '120mm' }}>患者(代理人)签字:</div> 医师签名:</div>
            <div style={{ display: 'flex' }}><div style={{ width: '110mm' }}>日期: &nbsp;&nbsp;2021年12月23日</div> 日期: &nbsp;&nbsp;2021年12月2 </div>
            <div>注:</div>

            <div style={{ display: 'flex', alignItems: 'center' }} className='haha'> 本证明书仅用于证明患者本次住院情况;</div>
            <div style={{ display: 'flex', alignItems: 'center' }} className='haha'> 本证明书须有本院医师的签名并在出院结账处盖章后生效;</div>
            <div style={{ display: 'flex', alignItems: 'center' }} className='haha'> 本证明书盖章生效后请妥善保管，遗失不补。</div>
          </div>
        </div>
        <div style={{borderBottom: '2px solid #222'}} />
        <div style={{ textAlign: 'center' }}>第2页</div>
      </div>}


    </div>

  )
}

export default Hospital;