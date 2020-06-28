import program from "commander";
import create from "./create";

let actionMap = {
  // 项目创建
  create: {
    description: "创建一个项目",
    alias: "c",
    usages: [
      // 使用方法
      "vit-cli create ProjectName",
      "vli create ProjectName",
    ],
  },
};

Object.keys(actionMap).forEach((action) => {
  const curItem = actionMap[action];
  // if (actionMap[action]) {
  // }
  program
    .command(action)
    .description(curItem.description)
    .alias(curItem.alias)
    .action(() => {
      switch (action) {
        case "create":
          create(...process.argv.slice(3));
          break;

        default:
          break;
      }
    });
});

program
  .command("create")
  .description("创建一个新项目")
  .alias("c")
  .action(async () => {});

// 项目版本
program
  .version(require("../package.json").version, "-v --version")
  .parse(process.argv);

/**
 * little-bird-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
