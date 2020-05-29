import program from 'commander';
import create from './create'; // 项目创建
import init from './init'; // 项目初始化
import dev from './dev'; // 项目启动
import build from './build'; //项目打包

/**
 * little-bird-cli 命令列表
 */
let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目', // 描述
    usages: [
      // 使用方法
      'little-bird-cli create ProjectName',
      'lb-cli create ProjectName',
      'lbc create ProjectName',
    ],
    alias: 'c', // 命令简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: ['little-bird-cli init', 'lb-cli init', 'lbc init'],
    alias: 'i',
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: ['little-bird-cli dev', 'lb-cli dev', 'lbc dev'],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000,
      },
    ],
    alias: 'd',
  },
  //打包
  build: {
    description: '服务端项目打包',
    usages: ['little-bird-cli build', 'lb-cli build', 'lbc build'],
    options: [
      {
        flags: '-u --username <port>',
        description: 'github用户名',
        defaultValue: '',
      },
      {
        flags: '-t --token <port>',
        description: 'github创建的token',
        defaultValue: '',
      },
    ],
    alias: 'b',
  },
};

// 添加create,init,dev命令
Object.keys(actionMap).forEach((action) => {
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach((option) => {
      let obj = actionMap[action].options[option];
      program.option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  // 通过绑定操作处理程序实现命令 (这里description的定义和 `.command` 是分开的)
  // 返回新生成的命令(即该子命令)以供继续配置
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        // 到这里具体命令实现逻辑还空缺，我们先打日志，看下命令处理情况
        case 'create':
          // 获取当前的项目名
          create(...process.argv.slice(3));
          break;
        case 'init':
          init(program.username, program.token);
          break;
        case 'dev':
          dev(program.port);
          break;
        case 'build':
          build();
          break;
        default:
          break;
      }
    });
});

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv);

/**
 * little-bird-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
