
const Telegraf = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf('7575915540:AAG2jRZ9N0rozG6tVhQ8HwpXcuxw5SKy2Rw'); // Замените на ваш токен
const OPENWEATHER_API_KEY = '213b2ad174fa0c790d402e0d8e640d97'; // Замените на ваш ключ API

bot.start((ctx) => {
    ctx.reply('Привет! Напиши мне название города, и я отправлю тебе текущую погоду.');
});

bot.on('text', async (ctx) => {
    const city = ctx.message.text;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    
    if (!response.ok) {
        ctx.reply('Не удалось получить данные о погоде. Убедитесь, что вы ввели правильное название города.');
        return;
    }

    const weatherData = await response.json();
    const { main, weather } = weatherData;

    const weatherInfo = `
    Погода в ${city}:
    Температура: ${main.temp}°C
    Ощущается как: ${main.feels_like}°C
    Влажность: ${main.humidity}%
    Описание: ${weather[0].description}
    `;

    ctx.reply(weatherInfo);
});

bot.launch();

