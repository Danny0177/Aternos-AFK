const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200);
    res.end("AFK bot is running");
}).listen(process.env.PORT || 3000);

const mineflayer = require("mineflayer");
const settings = require("./settings.json");

function log(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

process.on("uncaughtException", err => {
    console.error(`[${new Date().toLocaleTimeString()}] Uncaught Exception:`, err);
});

process.on("unhandledRejection", err => {
    console.error(`[${new Date().toLocaleTimeString()}] Unhandled Rejection:`, err);
});

function createBot() {

    log("Creating bot...");

    const bot = mineflayer.createBot({
        host: settings.server.host,
        port: settings.server.port,
        username: settings.account.username,
        version: settings.server.version
    });

    let reconnecting = false;

    function reconnect(reason) {
        if (reconnecting) return;

        reconnecting = true;

        log(`Disconnected (${reason}). Reconnecting in ${settings.reconnectDelay / 1000}s...`);

        setTimeout(() => {
            createBot();
        }, settings.reconnectDelay);
    }

    bot.on("connect", () => {
        log("TCP connected");
    });

    bot.on("inject_allowed", () => {
        log("Protocol injected");
    });

    bot.on("login", () => {
        log("Login packet received");
    });

    bot.once("spawn", () => {
        log("Bot connected!");

        // Very lightweight activity to keep connection alive
        setInterval(() => {
            if (bot.entity) {
                bot.look(
                    bot.entity.yaw + 0.2,
                    bot.entity.pitch,
                    true
                );

                log("Small activity tick");
            }
        }, 300000); // 5 minutes
    });

    bot.on("message", message => {
        log(`Server: ${message.toString()}`);
    });

    bot.on("kicked", reason => {
        log(`Kicked: ${JSON.stringify(reason)}`);
    });

    bot.on("error", err => {
        console.error(`[${new Date().toLocaleTimeString()}] Bot error:`, err);
    });

    bot.on("end", reason => {
        reconnect(reason);
    });

    bot.on("close", () => {
        log("TCP connection closed");
    });
}

createBot();
