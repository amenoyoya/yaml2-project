/**
 * Electron（Node.js）が実行する関数
 */
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

// 循環参照を解決しながらJSON文字列化
const safeJsonify = (obj) => {
  function fix() {
    //　Object||ArrayならリストにINして循環参照チェック
    var checkList = [];
    return (key,value) => {
      // 初回用
      if (key === '') {
        checkList.push(value)
        return value
      }
      // Node,Elementの類はカット
      if (value instanceof Node) {
          return undefined
      }
      // Object,Arrayなら循環参照チェック
      if (typeof value === 'object' && value !== null) {
          return checkList.every((v, i, a) => {
              return value !== v
          }) ? value: undefined
      }
      return value
    }
  }
  return JSON.stringify(obj, fix)
}

// yaml file => json object
const loadYamlFile = (filename) => {
  return yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
}

// json object => yaml file
const saveYamlFile = (filename, obj) => {
  console.log(safeJsonify(obj))
  return fs.writeFileSync(filename, yaml.dump(obj), 'utf8')
}

// callback functions
const procs = {
  // create directory
  dir(obj, cur) {
    const target = path.join(cur, obj.path);
    try {
      if (!fs.lstatSync(target).isDirectory()) {
        fs.mkdirSync(target)
      }
    } catch {
      fs.mkdirSync(target)
    }
  },

  // create file
  file(obj, cur) {
    fs.writeFileSync(path.join(cur, obj.path), obj.content || '')
  }
}

// json object => project
const createProject = (obj, cur='./') => {
  if (Array.isArray(obj)) {
    for (const o of obj) {
      createProject(o, cur)
    }
  } else if (typeof obj === 'object') {
    procs[obj.type](obj, cur)
    createProject(obj.children, obj.path? path.join(cur, obj.path): cur)
  }
}
