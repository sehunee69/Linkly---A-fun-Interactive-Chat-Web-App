import { saveMessage } from "./chat.repository.js";

export const handleMessage = async (data) => {
    return saveMessage(data);
};