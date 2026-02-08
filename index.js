require('dotenv').config();

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const catUrl = 'https://api.thecatapi.com/v1/images/search';

const chatId = process.env.CHAT_ID;
const intervalMs = 5000;
const getCatUrl = (url = catUrl) => `${url}?t=${new Date().getTime()}`;

const sendCat = async () => {
    const response = await fetch(catUrl);
    const data = await response.json();
    bot.telegram.sendPhoto(chatId, getCatUrl(data[0].url)).then(() => setTimeout(sendCat, intervalMs));
}

sendCat();

bot.botInfo = bot.telegram.getMe().then(() => console.log('Bot Started'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));