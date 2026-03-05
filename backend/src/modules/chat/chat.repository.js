import { Message } from "./message.model.js";
import { redis } from "../../config/redis.js";
import { pipe } from "zod";

const CACHE_KEY = (chatId) => `messages:${chatId}`
const CACHE_LIMIT = 100;

export const saveMessage = async (data) => {
    const message = await Message.create(data);

    // Push redis cache
    await redis.rpush(CACHE_KEY(data.chatId), JSON.stringify(message));
    // Trim to last 100 messages
    await redis.ltrim(CACHE_KEY(data.chatId), -CACHE_LIMIT, -1);

    return message
};

export const getMessages = async (chatId) => {
    const cached = await redis.lrange(CACHE_KEY(chatId), 0, -1);

    if(cached.length > 0) {
        console.log(`Room cached hit at ${chatId}`)
        return cached.map(msg => JSON.parse(msg));
    }

    console.log(`Cached miss for room ${chatId}, fetching from MongoDB`);
    const messages = await Message.find({ chatId}).sort({ createdAt: 1}).limit(CACHE_LIMIT);

    if(messages.lenth > 0 ) {
        const pipeline = redis.pipeline();
        messages.forEach(msg => pipeline.rpush(CACHE_KEY(chatId), JSON.stringify(msg)));
        pipeline.expire(CACHE_KEY(chatId), 60 * 60 * 24); // Expires in 24h
        await pipeline.exec();
    }

    return messages;
};