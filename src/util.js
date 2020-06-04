import fs from "fs";
import symbol from "log-symbols";
import chalk from "chalk";
import inquirer from "inquirer";
import downloadGit from "download-git-repo";

/**
 * 文件是否存在
 * @param {string} name
 */
export const notExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(
        symbol.error,
        chalk.red("文件夹名已被占用，请更换名字重新创建")
      );
    } else {
      resolve();
    }
  });
};

export const TEMPLATE_LIST = {
  vue: "vue",
  react: "react",
  miniApp: "miniApp",
};

console.log(Object.keys(TEMPLATE_LIST));

// 命令行交互模板
let promptList = [
  {
    type: "list",
    name: "frame",
    message: "请选择项目模板",
    choices: Object.keys(TEMPLATE_LIST),
  },
  {
    type: "input",
    name: "description",
    message: "项目描述: ",
  },
  {
    type: "input",
    name: "author",
    message: "作者名称: ",
  },
];

/**
 * 命令行交互
 */
export const prompt = () => {
  return new Promise((resolve) => {
    inquirer.prompt(promptList).then((answer) => {
      resolve(answer);
    });
  });
};

/**
 * 项目模板远程下载
 * @param {string} ProjectName 项目名
 * @param {string} url 模板地址
 */
export const downloadTemplate = async (ProjectName, url) => {
  return new Promise((resolve, reject) => {
    downloadGit(`direct:${url}`, ProjectName, { clone: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

//
/**
 * 更新json配置文件
 * @param {项目名} fileName
 * @param {*} obj
 */
export const updateJsonFile = (fileName, obj) => {
  return new Promise((resolve) => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      let json = JSON.parse(data);
      Object.keys(obj).forEach((key) => {
        json[key] = obj[key];
      });
      fs.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
      resolve();
    }
  });
};
