import http from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import { initSocket } from "./modules/chat/chat.socket.js";

const server = http.createServer(app);
const { PORT, MONGO_URL, CLIENT_URL } = env();

const io = new Server(server, {
    cors: { origin: CLIENT_URL}
});

initSocket(io);

connectMongo(MONGO_URL);



server.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
});