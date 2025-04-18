const fs = require('fs/promises');
const path = require('path');

// 현재 파일 위치 기준으로 tasks.csv 경로를 생성
const FILE_PATH = path.join(__dirname, '../tasks.csv');

// CSV 파일을 읽어서 JavaScript 객체 배열로 변환
async function readTasks() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');

        return data
            .split('\n')                 // 줄바꿈 기준으로 나누기
            .filter(Boolean)            // 빈 줄 제거
            .map(line => {
                const [task, done] = line.split(',');
                return {
                    task,
                    done: done === 'true'   // 문자열을 Boolean으로 변환
                };
            });
    } catch (err) {
        if (err.code === 'ENOENT') {
            // 파일이 없는 경우 (처음 실행한 경우) → 빈 배열 반환
            return [];
        }
        throw err; // 그 외 에러는 그대로 던짐
    }
}

// JavaScript 객체 배열을 CSV 형식 문자열로 변환 후 파일에 저장
async function writeTasks(tasks) {
    const lines = tasks.map(t => `${t.task},${t.done}`);
    const content = lines.join('\n');
    await fs.writeFile(FILE_PATH, content, 'utf-8');
}

module.exports = {
    readTasks,
    writeTasks
};
