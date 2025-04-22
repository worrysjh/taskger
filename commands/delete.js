module.exports = async function deleteHandler(argv, tasks, writeTasks) {
  const index = argv.delNum;
  if (tasks[index]) {
    const [removed] = tasks.splice(index, 1);
    await writeTasks(tasks);
    console.log(`🗑️ 삭제됨: "${removed.task}"`);
  } else {
    console.log("❗ 존재하지 않는 인덱스입니다.");
  }
};
