const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '536945098:AAF4FZ75O0mF6kmg5VJF3O6LPXRd4YRrdiY'

const bot = new TelegramBot(TOKEN, {
    polling: true
})

const KB = {
    schedule: 'Дарс жадвали',
    subject: 'Фанлар',
    mon: 'Душанба',
    tue: 'Сешанба',
    wed: 'Чоршанба',
    thur: 'Пайшанба',
    fri: 'Жума',
    sat: 'Шанба',
    sun: 'Якшанба',
    back: 'Оркага',
    student: 'Талабалар',
    iskandar: 'Холбоев',
    yulduz: 'Салаева',
    nozima: 'Қуватова',
    farrux: 'Валиқориев'
}

const SB = {
    mon: '2. ИПИ\n3. АИБ(маъруза)',
    tue: '2. АТАР(амалиёт)/ ПТПМ(маъруза)\n3. ИПИ',
    wed: '2. Амалий хорижий тил\n3. АИБ(амалиёт)',
    thur: '2. ПТПМ/\n3. АТАР(лаб.)/ АТАР(маъруза)',
    fri: '2. ЭАЯТ(маъруза)/ ЭАЯТ(амалиёт)\n3. АИБ(семинар)',
    sat: 'Дам олиш хам керакку',
    sun: 'Бугун якшанба курсдош!'
}

const SN = {
    ipi: 'ИПИ',
    aib: 'АИБ',
    atar: 'АТАР',
    ptpm: 'ПТПМ',
    eayt: 'ЭАЯТ',
    axt: 'АХТ'
}

bot.onText(/\/start/, msg => {
    sendGreeting(msg)
})

bot.on('message', msg => {
    switch (msg.text) {
        case KB.schedule:
            sendScheduleScreen(msg.chat.id)
            break
        case KB.subject:
            sendSubject(msg.chat.id)
            break
        case KB.back:
            sendGreeting(msg, false)
            break
        case KB.mon:
        case KB.tue:
        case KB.wed:
        case KB.thur:
        case KB.fri:
        case KB.sat:
        case KB.sun:
            sendScheduleByName(msg.chat.id, msg.text)
            break
        case SN.aib:
        case SN.atar:
        case SN.axt:
        case SN.eayt:
        case SN.ipi:
        case SN.ptpm:
            sendSubjectByName(msg.chat.id, msg.text)
            break
        case KB.student:
            sendStudent(msg.chat.id, msg.text)
        case KB.iskandar:
        case KB.yulduz:
        case KB.nozima:
        case KB.farrux:
            sendStudentsByName(msg.chat.id, msg.text)
            break
    }
})

function sendScheduleScreen(chatId) {
    bot.sendMessage(chatId, `Хафта кунини танланг: `, {
        reply_markup: {
            keyboard: [
                [KB.mon, KB.tue, KB.wed, KB.thur, KB.fri, KB.sat, KB.sun],
                [KB.back]
            ]
        }
    })
}

function sendGreeting(msg, sayHello = true){
    const text = sayHello
        ? `Ассалому алейкум, ${msg.from.first_name}!\nНима килишни хохлайсиз?`
        : `Нима килишни хохлайсиз?`

    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [KB.schedule, KB.subject, KB.student]
            ]
        }
    })
}

function sendScheduleByName(chatId, scheName) {
    //console.log(chatId, scheName)
    switch (scheName) {
        case KB.mon:
            bot.sendMessage(chatId, SB.mon)
            break
        case KB.tue:
            bot.sendMessage(chatId, SB.tue)
            break
        case KB.wed:
            bot.sendMessage(chatId, SB.wed)
            break
        case KB.thur:
            bot.sendMessage(chatId, SB.thur)
            break
        case KB.fri:
            bot.sendMessage(chatId, SB.fri)
            break
        case KB.sat:
            bot.sendMessage(chatId, SB.sat)
            break
        case KB.sun:
            bot.sendMessage(chatId, SB.sun)
            break
    }
}

function sendSubject(chatId) {
    bot.sendMessage(chatId, `Фанни танланг: `, {
        reply_markup: {
            keyboard: [
                [SN.aib, SN.atar, SN.axt, SN.eayt, SN.ipi, SN.ptpm],
                [KB.back]
            ]
        }
    })
}

function sendSubjectByName(chatId, subName) {
    switch (subName) {
        case SN.aib:
            bot.sendMessage(chatId, `Архив иши бошқаруви (Ганиева Б.И.)`)
            break
        case SN.atar:
            bot.sendMessage(chatId, `Архив тизимларида архборот ресурслари (Рахматуллаев М.А., Ганиева Б.И.)`)
            break
        case SN.axt:
            bot.sendMessage(chatId, `Амалий хорижий тил (Шарипова А.)`)
            break
        case SN.eayt:
            bot.sendMessage(chatId, `Электрон архив яратиш технологиялари (Хундибаев А.М.)`)
            break
        case SN.ipi:
            bot.sendMessage(chatId, `Илмий педагогика иши (Ганиева Б.И.)`)
            break
        case SN.ptpm:
            bot.sendMessage(chatId, `Педагогик технологиялар ва педагогик махорат (Юнусова Д.)`)
            break
    }
}

function sendStudent(chatId) {
    bot.sendMessage(chatId, `Талабани танланг: `, {
        reply_markup: {
            keyboard: [
                [KB.iskandar, KB.yulduz, KB.nozima, KB.farrux],
                [KB.back]
            ]
        }
    })
}

function sendStudentsByName(chatId, studentName) {
    switch (studentName) {
        case KB.iskandar:
            bot.sendMessage(chatId, `Холбоев Искандар Анваржон ўғли, Тошкент шаҳри, Сергели тумани, 1-мавзе, 14-уй, 1-хонадон +998935287888`)
            break
        case KB.yulduz:
            bot.sendMessage(chatId, `Салаева Юлдуз Улуғбековна, Тошкент шаҳри, Миробод тумани, 2-кўча, 6-уй +998977674662`)
            break
        case KB.nozima:
            bot.sendMessage(chatId, `Қуватова Нозима Бахтиёровна, Тошкент шаҳри, М.Улуғбек тумани, Ж.Обидова кўчаси 100 а-15 уй +998909826622`)
            break
        case KB.farrux:
            bot.sendMessage(chatId, `Валиқориев Фаррух Фозил ўғли, Тошкент шаҳри, Чилонзор тумани, 2-мавзе, 69-уй, 16-хонадон +998935648118`)
    }
}