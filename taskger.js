#!/usr/bin/env node

const { readTasks, writeTasks } = require("./utils/file");
const yargs = require("yargs");

async function run() {
  const tasks = await readTasks();

  yargs
    .command({
      command: "add",
      describe: "새로운 할 일을 추가합니다.",
      builder: {
        newTask: {
          describe: "추가할 일 내용",
          demandOption: true,
          type: "string"
        }
      },
      async handler(argv){
        tasks.push({task: argv.newTask, done: false});
        await writeTasks(tasks);
        console.log(`✅ 추가됨: "${argv.newTask}"`);
      }
    })
    .command({
      command: "list",
      describe: "전체 할 일 목록을 조회합니다.",
      handler(){
        tasks.forEach((t, i)=>{
          const status = t.done ? "☑" : "⬜";
        console.log(`${i}: ${status} ${t.task}`);
        })
      }
    })
    .command({
      command: "done",
      describe: "할 일의 상태를 완료로 변경합니다.",
      builder: {
        taskNum: {
          describe: "완료 처리할 일의 번호",
          demandOption: true,
          type: "number"
        }
      },
      async handler(argv){
        const index = argv.taskNum;
        if(tasks[index]){
          if(tasks[index].done)
            console.log("이미 완료 처리된 작업입니다.");
          else{
            tasks[index].done = true;
            await writeTasks(tasks);
            console.log(`☑️ 완료 처리: "${tasks[index].task}"`);
          }
        } else{
          console.log("❗ 존재하지 않는 인덱스입니다.");
        }
      }
    })
    .command({
      command: "delete",
      describe: "할 일을 목록에서 삭제합니다.",
      builder: {
        delNum: {
          describe: "삭제 처리할 일의 번호",
          demandOption: true,
          type: "number"
        }
      },
      async handler(argv){
        const index = argv.delNum;
        if(tasks[index]){
          const [removed] = tasks.splice(index, 1);
          await writeTasks(tasks);
          console.log(`🗑️ 삭제됨: "${removed.task}"`)
        } else{
          console.log("❗ 존재하지 않는 인덱스입니다.")
        }
      }
    })
    .help()
    .argv;
}
run();
