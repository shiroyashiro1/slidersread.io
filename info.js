const questionmark = document.getElementById("questionmark");
const parameters   = document.getElementById("parameters");
// const pause_button   = document.getElementById("pause_button");
// const reset_button   = document.getElementById("reset_button");
// const prev_parag_but = document.getElementById("previous_paragraf_button");
// const next_parag_but = document.getElementById("next_paragraf_button");
// const change_setup   = document.getElementById("change_setup");
// const reading_speed  = document.getElementById("reading_speed");
// const text_container = document.getElementById("text_container");


const instruction = [
    {
        text: "^ Чтобы начать нажмите на кнопку Play.<br>Если вы захотите остановить чтение, нажмите Pause.",
        position: pause_button
    },
    {
        text: "^ Чтобы сменить текст нажмите на это поле.<br>Выделите весь текс и удалите его.",
        position: text_container
    },
    {
        text: "^ Потом нажмите кнопу Reset.",
        position: reset_button
    },
    {
        text: "^ Потом нажмите кнопку Play,<br>чтобы запустить чтение",
        position: pause_button
    },
    {
        text: "^ Чтобы сменить скорость чтения,<br>введите количество слов в минуту,<br>с которым вы хотите читать.",
        position: reading_speed
    },
    {
        text: "Чтобы сменить цвет текста, шрифт<br>или размер текста,<br>нажмите на шестеренку рядом с<br>кнопкой инструкции.",
        position: parameters
    },
];

const lock_block = document.createElement("div");
const msg_block = document.createElement("div");

let instruction_number = 0;

questionmark.addEventListener('click', () => {
    instruction_number = 0;

    lock_block.className = "lock_block";
    msg_block.className = "msg_block";
    msg_block.innerHTML = "Это сообщение - инструкция по использованию.<br>Чтобы продолжить нажмите на это сообщение.";

    lock_block.appendChild(msg_block);

    document.body.appendChild(lock_block);
});

lock_block.addEventListener('click', () => {

    if (instruction_number != instruction.length) {
        let i = instruction_number;
        let x = instruction[i].position.getBoundingClientRect();
        let y = Math.floor(x.left);
        x = Math.floor(x.bottom + 10);

        console.log(x, y);

        msg_block.innerHTML = instruction[i].text;
        msg_block.style.top = x + "px";
        msg_block.style.left = y + "px";

        instruction_number++;
    } else {
        document.body.removeChild(lock_block);
    }
});
