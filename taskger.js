#!/usr/bin/env node

const { readTasks, writeTasks } = require("./utils/file");
const { Command } = require("commander");
const program = new Command();

const addHandler = require("./commands/add");
const listHandler = require("./commands/list");
const doneHandler = require("./commands/done");
const deleteHandler = require("./commands/delete");

program.name("taskger").description("CLI Task Manager").version("1.0.0");

program
  .command("add")
  .description("할 일을 추가합니다.")
  .requiredOption("-n, --new-task <task>", "추가할 할 일 내용")
  .action(async (opts) => {
    const tasks = await readTasks();
    addHandler({ newTask: opts.newTask }, tasks, writeTasks);
  });

program
  .command("list")
  .description("전체 할 일 목록을 조회합니다.")
  .action(async () => {
    const tasks = await readTasks();
    listHandler(tasks);
  });

program
  .command("done")
  .description("할 일을 완료 처리합니다.")
  .requiredOption("-i, --index-num <index>", "완료 처리할 할 일 번호")
  .action(async (opts) => {
    const tasks = await readTasks();
    doneHandler({ indexNum: parseInt(opts.indexNum) }, tasks, writeTasks);
  });

program
  .command("delete")
  .description("할 일을 삭제합니다.")
  .requiredOption("-d, --del-num <index>", "삭제할 할 일 번호")
  .action(async (opts) => {
    const tasks = await readTasks();
    deleteHandler({ delNum: parseInt(opts.delNum) }, tasks, writeTasks);
  });

program.parse();
