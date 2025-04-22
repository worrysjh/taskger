module.exports = async function listHandler(tasks) {
  if (tasks.length === 0) {
    console.log("📭 할 일이 없습니다.");
    return;
  }

  tasks.forEach((t, i) => {
    const status = t.done ? "☑" : "⬜";
    console.log(`${i}: ${status} ${t.task}`);
  });
};
