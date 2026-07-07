const net = require("net");
const settings = require("./settings.json");

const socket = new net.Socket();

socket.setTimeout(10000);

socket.on("connect", () => {
    console.log("Minecraft port is reachable!");
    socket.destroy();
});

socket.on("timeout", () => {
    console.log("Connection timed out");
    socket.destroy();
});

socket.on("error", (err) => {
    console.log("Connection error:", err.message);
});

socket.connect(
    settings.server.port,
    settings.server.host
);
