module.exports = async function addHandler(argv, tasks, writeTasks) {
  tasks.push({ task: argv.newTask, done: false });
  await writeTasks(tasks);
  console.log(`✅ 추가됨: "${argv.newTask}"`);
};
