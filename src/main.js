import program from "commander";
import symbol from "log-symbols";
import chalk from "chalk";
import ora from "ora";

import {
  notExistFold,
  prompt,
  TEMPLATE_LIST,
  downloadTemplate,
  updateJsonFile,
} from "./util";

program
  .command("create")
  .description("创建一个新项目")
  .alias("c")
  .action(async () => {
    let loading = ora("模板下载中...");
    const prjName = process.argv[3];
    try {
      if (prjName === undefined) {
        console.log(symbol.error, chalk.red("创建项目时，请输入项目名"));
      } else {
        // 检测是否有同名文件
        await notExistFold(prjName);
        let promptResult = await prompt();
        let dowloadUrl = ""; // 下载地址

        switch (promptResult.frame) {
          case TEMPLATE_LIST.react:
            console.log(symbol.warning, chalk.yellow("react模板暂时没有"));
            process.exit(1);
            break;
          case TEMPLATE_LIST.vue:
            dowloadUrl = "https://github.com/EEEVO/zlwy.git";
            break;
          case TEMPLATE_LIST.miniApp:
            break;
          default:
            break;
        }

        loading.start("模板下载中...");
        await downloadTemplate(prjName, dowloadUrl);
        loading.succeed("模板下载完成");
        // TODO:此处需要throw
        //   loading.succeed("模板下载失败");

        // 下载完成后,根据用户输入更新配置文件
        const fileName = `${prjName}/package.json`;
        promptResult.name = prjName;
        await updateJsonFile(fileName, promptResult);
        console.log(symbol.success, chalk.green("配置文件更新完成"));
      }
    } catch (error) {
      console.log(symbol.error, chalk.green(error));
    }
  });

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
