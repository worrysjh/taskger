#!/usr/bin/env node
/* eslint-disable */

const [,, cmd, ...args] = process.argv;
const { readTasks, writeTasks } = require('./utils/file');

async function run() {
    const tasks = await readTasks();

    switch (cmd) {
        case 'add':
            const newTask = args.join(' ');
            tasks.push({ task: newTask, done: false });
            await writeTasks(tasks);
            console.log(`✅ 추가됨: "${newTask}"`);
            break;

        case 'list':
            tasks.forEach((t, i) => {
                const status = t.done ? '☑' : '⬜';
                console.log(`${i}: ${status} ${t.task}`);
            });
            break;

        case 'done':
            const doneIdx = parseInt(args[0]);
            if (tasks[doneIdx]) {
                tasks[doneIdx].done = true;
                await writeTasks(tasks);
                console.log(`☑️ 완료 처리: "${tasks[doneIdx].task}"`);
            } else {
                console.log("❗ 존재하지 않는 인덱스입니다.");
            }
            break;

        case 'delete':
            const delIdx = parseInt(args[0]);
            if (tasks[delIdx]) {
                const [removed] = tasks.splice(delIdx, 1);
                await writeTasks(tasks);
                console.log(`🗑️ 삭제됨: "${removed.task}"`);
            } else {
                console.log("❗ 존재하지 않는 인덱스입니다.");
            }
            break;

        default:
            console.log("🛠 사용 가능한 명령어:");
            console.log("  taskger add \"할 일 내용\"");
            console.log("  taskger list");
            console.log("  taskger done <인덱스번호>");
            console.log("  taskger delete <인덱스번호>");
    }
}

run();
