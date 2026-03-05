import { verifyToken } from "../../utils/jwt.js";
import { redis } from "../../config/redis.js";
import * as chatService from "./chat.service.js";

export const initSocket = (io) => {
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            console.log('Socket auth token:', token); 
            socket.user = verifyToken(token);
            console.log('Socket user:', socket.user);
            next();
        } catch (err) {
            console.error('Socket auth error:', err.message);
            next(new Error("Unauthorized!"));
        }
    });

    io.on("connection", (socket) => {
        // Store active user in redis
        redis.set(`active ${socket.user.id}`, socket.id);

        socket.on("join", (chatId) => {
            socket.join(chatId);
        });

        socket.on("message", async (data) => {
            const message = await chatService.handleMessage({
                chatId: data.chatId,
                senderId: socket.user.id,
                content: data.content
            });

            socket.to(data.chatId).emit("message", message);
        });

        socket.on("disconnect", () => {
            redis.del(`active ${socket.user.id}`);
        });
    });
};
