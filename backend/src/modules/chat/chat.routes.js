import express from 'express';
import { getMessages } from './chat.repository';
import { authentication } from '../../middleware/auth.middleware';

const router = express();

router.get("/:chatId/messages", authentication, async (req, res, next) => {
    try {
        const messages = await getMessages(req.params.chatId)
        res.json(messages)
    } catch (err) {
        next(err);
    }
});

export default router;