const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const loadYamlFile = (filename) => {
  return yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
}

try {
  const data = loadYamlFile(path.join(__dirname, 'data.yaml'));
  console.log(data);
  console.log(data.items[1].price);
} catch (err) {
  console.error(err.message);
}
