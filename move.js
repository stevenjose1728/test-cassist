const fs = require('fs-extra')
const path = require("path");
const parent_folder = path.join(__dirname, '..');
const items = ['index.html', 'favicon.ico', 'manifest.json', 'asset-manifest.json', 'robots.txt']
const sub_folder = '/admin/';
const parentItems = [
  'static'
];

parentItems.forEach(async element => {
  if(fs.existsSync(parent_folder+'/'+element)){
    await fs.remove(parent_folder+'/'+element);
    console.log('>>: Archivo > '+element+' eliminado exitosamente');
  }
  fs.rename(__dirname + '/build/'+element, parent_folder+'/'+element, function (err) {
    if (err){
      console.error('>>: error > moviendo archivos', err)
      throw err
    }
    console.log('Nuevo Archivo '+ element +' escrito exitosamentee!')
  });
});
items.forEach(async element => {
  if(fs.existsSync(parent_folder+sub_folder+element)){
    await fs.remove(parent_folder+sub_folder+element);
    console.log('>>: Archivo > '+element+' eliminado exitosamente');
  }
  fs.rename(__dirname + '/build/'+element, parent_folder+sub_folder+element, function (err) {
    if (err){
      console.error('>>: error > moviendo archivos', err)
      throw err
    }
    console.log('Nuevo Archivo '+ element +' escrito exitosamentee!')
  });
});
