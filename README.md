# 🛠️ taskger

**taskger**는 Node.js 기반의 간단하고 강력한 CLI(명령줄) 할 일(Task) 관리 도구입니다.  
CSV 파일을 통해 데이터를 로컬에 저장하며, `add`, `list`, `done`, `delete` 명령어로 일정을 손쉽게 관리할 수 있습니다.

---

## 🚀 주요 기능

- 새로운 할 일 추가 (`add`)
- 전체 목록 조회 (`list`)
- 할 일 완료 처리 (`done`)
- 할 일 삭제 (`delete`)
- `commander` 기반 명령어 파싱
- CSV 파일 기반 로컬 저장소 관리

---

## 📦 설치 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/your-username/taskger.git
cd taskger
```

### 2. 의존성 설치

```bash
npm install
```

### 3. CLI 전역 등록 (개발 중 테스트용)

```bash
npm link
```

---

## ⚙️ 사용 예시

```bash
taskger add --newTask "Node.js 복습하기"
taskger list
taskger done --taskNum 0
taskger delete --delNum 0
```

### 축약 명령어도 지원

```bash
taskger add -t "청소하기"
taskger done -n 0
taskger delete -d 0
```

---

## 🧾 저장 파일 위치

- `output/tasks.csv` 파일로 자동 저장됩니다.
- 실행 시 `output/` 디렉토리가 없으면 자동 생성됩니다.

---

## 📁 프로젝트 구조

```
taskger/
├── taskger.js              # 메인 CLI 실행 파일 (entry point)
├── commands/               # 명령어별 핸들러 (add, list, done, delete)
├── utils/                  # 유틸리티 함수 모음 (파일 입출력)
├── output/                 # CSV 저장소 (gitignore 대상)
└── package.json
```

---

## 📄 예시 tasks.csv 파일

```
청소하기,false
Node.js 복습하기,true
```

---

## 📂 흐름도

![taskger 흐름도](https://github.com/user-attachments/assets/b85bca66-2dcf-4dc2-923e-4746283393d4)


---

## 🖥️ 데모화면

![image](https://github.com/user-attachments/assets/ee4a5786-9628-4ed3-9863-f6b37f0a822a)
