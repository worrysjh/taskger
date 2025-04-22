module.exports = async function doneHandler(argv, tasks, writeTasks) {
  const index = argv.taskNum;
  if (tasks[index]) {
    if (tasks[index].done) console.log("이미 완료 처리된 작업입니다.");
    else {
      tasks[index].done = true;
      await writeTasks(tasks);
      console.log(`☑️ 완료 처리: "${tasks[index].task}"`);
    }
  } else {
    console.log("❗ 존재하지 않는 인덱스입니다.");
  }
};
