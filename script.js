const speed          = document.getElementById("reading_speed");
const pause_change   = document.getElementById("pause");
const text_container = document.getElementById("text_container");
const parag_len      = document.getElementById("parag_len");
const word_coun      = document.getElementById("word_coun");
const reset_button   = document.getElementById("reset_button");
const text_marker    = document.getElementById("text_marker");

let play = false;
let pause = false;
let global_w_i = 0;

class TextSlider {
    constructor() {
        this.last_word = document.getElementById("last_word");
        this.curr_word = document.getElementById("curr_word");
        this.next_word = document.getElementById("next_word");

        this.clear();
    }

    set_text(word) {
        this.last_word.innerHTML = this.curr_word.innerHTML;
        this.curr_word.innerHTML = this.next_word.innerHTML;
        this.next_word.innerHTML = word;
    }

    clear() {
        this.curr_word.style.color = "#1f0008";
        this.last_word.innerHTML = "";
        this.curr_word.innerHTML = "";
        this.next_word.innerHTML = "";
    }
}

class TextMarker {
    constructor(_paragraf) {
        this.last_index = 0;
        this.nomarker = "nomarker";
        this.marker = "marker";
        this.paragraf = [];

        this.setparagraf(_paragraf);
    }

    setparagraf(_paragraf) {
        this.last_index = 0;
        this.paragraf = [];
        
        for (let i = 0; i < _paragraf.length; i++) {
            this.paragraf[i] = `<span class="${this.nomarker}">${_paragraf[i]}</span>`;
        }
        this.paragraf[0] = this.paragraf[0].replace(this.nomarker, this.marker);
        this.printtext();
    }

    wordmarking(index) {
        this.paragraf[this.last_index] = this.paragraf[this.last_index].replace(this.marker, this.nomarker);
        this.paragraf[index] = this.paragraf[index].replace(this.nomarker, this.marker);
        this.last_index = index;
        this.printtext();
    }

    printtext() {
        text_marker.innerHTML = this.paragraf.join(" ");
    }
}

text_marker.addEventListener('click', e => {
    global_w_i = Array.prototype.indexOf.call(text_marker.children, e.target);
});

reset_button.addEventListener('click', (e) => {
    play = false;
    pause = false;
});

pause_change.addEventListener('click', (e) => {
    pause = pause == false;
    if (!play) {
        setTimeout(print_text, 10);
    }
    if (pause) {
        play = true;
        pause_change.innerHTML = "Pause";
    } else {
        pause_change.innerHTML = "Play";
    }
}, false);

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms));

async function print_text() {
    parag_len.innerHTML = 0;
    word_coun.innerHTML = 0;

    const atext = text_container.value.split("\n");
    if (atext[0].length == 0) {
        tslide.curr_word.value = "Cannot print empty text!";
        tslide.curr_word.style.color = "red";
        return false;
    }

    let tslide = new TextSlider();
    let tmarker = new TextMarker(atext[0].split(" "));

    let delay = Math.floor(1000 / (Number(speed.value) / 60));
    let word = "";

    for (let p_i = 0; p_i < atext.length; p_i++) {
        let paragraf = atext[p_i].split(" ");

        tmarker.setparagraf(paragraf);

        for (global_w_i = 0; global_w_i < paragraf.length; global_w_i++) {

            if (!play) return false;
            if (!pause) {
                while (!pause) {
                    await timer(100);
                    if (!play) return false;
                }
                delay = Math.floor(1000 / (Number(speed.value) / 60));
            }
            word = paragraf[global_w_i];
            if (word.length > 0) {
                parag_len.innerHTML = p_i + 1;
                word_coun.innerHTML = global_w_i + 1;
                tmarker.wordmarking(global_w_i);
                tslide.set_text(word);
            }
            await timer(delay);
        }
    }

    tslide.set_text("");

    pause = false;
    play = false;
    pause_change.innerHTML = "Play";

    return true;
}