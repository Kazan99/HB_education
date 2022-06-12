const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const text = require('./const');
const text_const = require('./text');

function telegram_connect() {

    const bot = new Telegraf(process.env.BOT_TOKEN);
    //bot.start((ctx) => console.log(ctx.message));
    bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name + ' ' + ctx.message.from.last_name : 'Незнакомец'}`));
    bot.help((ctx) => ctx.reply(text.commands));

    bot.command('course', async (ctx) => {
        try {
            await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
                [
                    [Markup.button.callback('HTML', 'btn_1'), Markup.button.callback('CSS', 'btn_2'), Markup.button.callback('JavaScript', 'btn_3')],
                    [Markup.button.callback('NodeJs', 'btn_4'), Markup.button.callback('Bootstrap', 'btn_5')]
                ]
            ));
        } catch(error) {
            console.error(error);
        }
    });

    function addActionBot(name, src, text)
    {
        bot.action(name, async (ctx) => {
            try {
                await ctx.answerCbQuery();
                if (src !== false) {
                    await ctx.replyWithPhoto ({
                        url: src
                    })
                }
                await ctx.replyWithHTML(text , {
                    disable_web_page_preview: true
                });
            } catch (e) {
                console.error(e);
            }
        })
    };

    addActionBot('btn_1','https://i.ytimg.com/vi/Sda2kF9y9Gw/maxresdefault.jpg' , text_const.text1);
    addActionBot('btn_2','https://i.ytimg.com/vi/Fw679JPOo0w/maxresdefault.jpg', text_const.text2 );
    addActionBot('btn_3','https://i.ytimg.com/vi/JgIG6d3JsZs/maxresdefault.jpg', text_const.text3 );
    addActionBot('btn_4','https://i.ytimg.com/vi/ob9qRQeajA0/maxresdefault.jpg', text_const.text4 );
    addActionBot('btn_5','https://i.ytimg.com/vi/TZSY6rDUDrE/maxresdefault.jpg', text_const.text5 );

    bot.launch();


    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

module.exports = {telegram_connect};