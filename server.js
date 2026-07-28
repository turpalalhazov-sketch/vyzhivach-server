const WebSocket = require("ws");

const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

console.log("Сервер запущен!");

let players = {}; // список игроков

server.on("connection", socket => {
    console.log("Игрок подключился");

    // отправляем сообщение игроку
    socket.send("Добро пожаловать на сервер!");

    // когда игрок присылает данные
    socket.on("message", data => {
        console.log("Сообщение от игрока:", data);

        // рассылаем всем игрокам
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });

    // когда игрок отключается
    socket.on("close", () => {
        console.log("Игрок отключился");
    });
});
