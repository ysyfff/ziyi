const fs = require('fs')

fs.readFile('./public/service-worker-tmpl.js', 'utf8', (err, data) => {
  if (err) {
    console.log('=====读取service-worker的version失败=====')
    return;
  }
  console.log('=====读取service-worker的version成功=====')
  fs.writeFile(
    './public/service-worker.js',
    data.replace('$VERSION', new Date().getTime(),
    { flag: 'w+' }),
    err=>{
      if(err){
        console.log('=====更新service-worker的version失败=====')
        return;
      }
      console.log('=====更新service-worker的version成功=====')
    }
  )
})