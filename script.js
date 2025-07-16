
const tasks = {
    "♠7": { task: "模仿任意一人动作3次", drink: 2 },
    "♥A": { task: "对一人说一句真心话", drink: 1 },
    "♦K": { task: "跳一段你最拿手的舞", drink: 3 },
    "♣10": { task: "全场干杯一次", drink: 2 },
    "JOKER1": { task: "你是上帝，选择一人执行任何任务", drink: 0 },
    "JOKER2": { task: "你是恶魔，选择一人执行黑令任务", drink: 0 }
};

let player = {
    name: "",
    role: "",
    drinkCount: 0,
    history: []
};

function startGame() {
    const name = document.getElementById("nickname").value;
    const role = document.getElementById("role").value;
    if (!name) return alert("请输入昵称");
    player.name = name;
    player.role = role;
    document.getElementById("player-name").innerText = name;
    document.getElementById("player-role").innerText = role;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("card-screen").style.display = "block";
}

function drawCard() {
    const keys = Object.keys(tasks);
    const card = keys[Math.floor(Math.random() * keys.length)];
    const task = tasks[card];
    document.getElementById("card-display").innerText = `你抽到了 ${card}`;
    document.getElementById("card-result").innerText = `任务：${task.task}（喝酒：${task.drink}口）`;
    player.currentCard = card;
}

function completeTask() {
    if (!player.currentCard) return;
    const task = tasks[player.currentCard];
    player.drinkCount += task.drink;
    player.history.push({ card: player.currentCard, result: "完成", drink: task.drink });
    updateHistory();
    player.currentCard = null;
    document.getElementById("card-display").innerText = "";
    document.getElementById("card-result").innerText = "";
}

function failTask() {
    if (!player.currentCard) return;
    player.history.push({ card: player.currentCard, result: "放弃", drink: 3 });
    player.drinkCount += 3;
    updateHistory();
    player.currentCard = null;
    document.getElementById("card-display").innerText = "";
    document.getElementById("card-result").innerText = "";
}

function updateHistory() {
    const list = document.getElementById("history-log");
    list.innerHTML = "";
    player.history.forEach(h => {
        const li = document.createElement("li");
        li.innerText = `${h.card} - ${h.result}（喝酒 ${h.drink} 口）`;
        list.appendChild(li);
    });
}
