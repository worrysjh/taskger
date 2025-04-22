#!/usr/bin/env node

const { readTasks, writeTasks } = require("./utils/file");
const yargs = require("yargs");

const addHandler = require("./commands/add");
const listHandler = require("./commands/list");
const doneHandler = require("./commands/done");
const deleteHandler = require("./commands/delete");

async function run() {
  const tasks = await readTasks();

  yargs
    .parserConfiguration({
      "camel-case-expansion": true,
    })
    .command({
      command: "add",
      describe: "새로운 할 일을 추가합니다.",
      builder: {
        newTask: {
          describe: "추가할 일 내용",
          demandOption: true,
          type: "string",
          alias: "n",
        },
      },
      handler: (argv) => addHandler(argv, tasks, writeTasks),
    })
    .command({
      command: "list",
      describe: "전체 할 일 목록을 조회합니다.",
      handler: () => listHandler(tasks),
    })
    .command({
      command: "done",
      describe: "할 일의 상태를 완료로 변경합니다.",
      builder: {
        indexNum: {
          describe: "완료 처리할 일의 번호",
          demandOption: true,
          type: "number",
          alias: "i",
        },
      },
      handler: (argv) => doneHandler(argv, tasks, writeTasks),
    })
    .command({
      command: "delete",
      describe: "할 일을 목록에서 삭제합니다.",
      builder: {
        delNum: {
          describe: "삭제 처리할 일의 번호",
          demandOption: true,
          type: "number",
          alias: "d",
        },
      },
      handler: (argv) => deleteHandler(argv, tasks, writeTasks),
    })
    .demandCommand(1, "❗ 명령어를 입력하세요.")
    .strict() // 잘못된 옵션을 막음
    .help()
    .wrap(null)
    .epilog("📌 단축 옵션 안내: -n (add), -i (done), -d (delete)")
    .argv; // 모든 명령어 파싱과 실행이 이루어짐짐
}

run();
