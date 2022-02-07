import React from 'react'
import { Header } from './hospital'

const Hospital = props => {
  return (
    <div>
      <div style={{ width: '210mm', height: '297mm', padding: '0 15mm', margin: '0 auto', fontWeight: 500 }}>

        <div style={{ height: '278mm' }}>
          <Header />

          <div>
            及“胃周脂肪内淋巴结”1枚，早反应性增生。2、&lg;大网膜&gt;未见确切痛累及。3、&lt;肝总A旁淋巴结&gt;4枚，早反应性增生。4、&lt;胰腺上缘组织&gt;送检为7枚淋巴结，呈反应性增生。5、&lt;下腔V旁淋巴结&gt;1枚。早反应性增生。向患者及家属交代病情，今日要求出院。
            <div style={{ fontWeight: 700, color: '#000' }}>

              自费使用药物:琥珀酰明胶、钠钾镁钙葡萄糖、人血白蛋白、艾司奥美拉唑钠、氨溴索、多烯磷脂酰胆碱、丁二磺酸腺苷蛋氨酸、异甘草酸美、生长抑素、丙氨酰谷氨酰胺、盐酸昂丹司琼、重组人碱性成纤维细胞生长因子、复方氨基酸注射液(15)双、复合磷酸氢钾、结构脂肪乳、w3鱼油脂肪乳、雷贝拉唑钠、盐酸溴己新
            </div>
            <div>
              出院医嘱:1、注意休息，合理膳食，预防感冒，注意监测控制血糖;2、门诊随诊，每周复查血常规及生化，不适及时就诊，定期复查，科室电话028-85420845;3、院外继续治疗;4、注意加强腹腔引流管护理保持通畅，预防感染及脱落;定期更换引流袋，及时复查根据情况拔管;5、3周左右返院进一步治疗
            </div>
            <div style={{ display: 'flex' }}><div style={{ width: '120mm' }}>患者(代理人)签字:</div> 医师签名:</div>
            <div style={{ display: 'flex' }}><div style={{ width: '110mm' }}>日期: &nbsp;&nbsp;2021年12月23日</div> 日期: &nbsp;&nbsp;2021年12月2 </div>
            <div>注:</div>

            <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 16, height: 16, borderRadius: 16, background: '#333', marginRight: 3 }}></div> 本证明书仅用于证明患者本次住院情况;</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 16, height: 16, borderRadius: 16, background: '#333', marginRight: 3 }}></div> 本证明书须有本院医师的签名并在出院结账处盖章后生效;</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ width: 16, height: 16, borderRadius: 16, background: '#333', marginRight: 3 }}></div> 本证明书盖章生效后请妥善保管，遗失不补。</div>
          </div>
        </div>
        <div style={{ height: 2, backgroundColor: '#333', width: '100%' }} />
        <div style={{ textAlign: 'center' }}>第2页</div>
      </div>
      
    </div>
  )
}

export default Hospital;