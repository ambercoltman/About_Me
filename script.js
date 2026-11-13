//bouncing letters in name
const nameEl = document.getElementById("name");
const nameText = nameEl.textContent;

nameEl.textContent ="";

nameText.split("").forEach((letter, i)=>{
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00a0" : letter;
    span.style.setProperty("--i", i);

    nameEl.appendChild(span);
});


//fireflies
const fliesBox = document.getElementById("flies");

for(let i = 0; i < 22; i++){
    const fly = document.createElement("span");

    fly.className = "fly";
    fly.style.left = Math.random() * 100 + "%";
    fly.style.top = 30 + Math.random() * 70 + "%";

    fly.style.setProperty("--d", 6 + Math.random()*7+"s");
    fly.style.setProperty("--w", -Math.random()*10+"s");
    fly.style.setProperty("--x", Math.random()*60-30+"px");

    fliesBox.appendChild(fly);
}

//scroll animation
//anything that has the class "reveal" fades in when you scroll to it
const observer = new IntersectionObserver(
    (entries) =>{
        entries.forEach((entry) =>{
            if(entry.isIntersecting){
                entry.target.classList.add("in");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".reveal").forEach((el, i) =>{
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    observer.observe(el);
});

//hopping frog
const frog = document.getElementById("frog");
const bubble = document.getElementById("bubble");

const message = [
    "Ribbit!💚",
    "Almost there!",
    "Hop hop hop!",
    "Dreams come true with hard work.",
    "Ooo, a firefly!",
    "Secure your passwords, honee."
];

const positions = [-130, -20, 100, -60, 40];
let hops = 0;

frog.style.transform ="translateX(-50%)";

frog.addEventListener("click", () =>{
    const x = positions[hops % positions.length] - 20;

    //jumps up
    frog.style.transform = `translate(${x}px, -60px) rotate(-12deg)`;

    //frog lands
    setTimeout(() =>{
        frog.style.transform = `translate(${x}px, 0) rotate(0)`;
        hops++;
    }, 320);

    bubble.textContent = message[hops % message.length];
});

//piano
const keysBox = document.getElementById("keys");

//note sounds starting from middle c
const notes = [
    261.63, 277.18, 293.66, 311.13, 329.63, 329.23, 349.23,
    369.99, 392.0, 415.3, 440.0, 466.16, 493.88
];

// w = white keys, b = black keys
const layout = ["w", "b", "w", "b", "w", "w","b", "w", "b", "w", "b", "w",];

//computer keyboard shortcuts
const keyMap ={
    a:0, w:1, s:2, e:3, d:4, f:5,
    t:6, g:7, y:8, h:9, u:10, j:11
};

const keyEls = [];
let audio = null;

//build the keys
layout.forEach((type, i) =>{
    const key = document.createElement("div");

    key.className = "key" + (type ==="b" ? " b" : "");
    key.textContent = type === "w" ? "♪" : "";
    key.setAttribute("role", "button");
    key.setAttribute("aria-label", "Piano key");

    key.addEventListener("pointerdown", () => playNote(i));

    keysBox.appendChild(key);
    keyEls[i] = key;
});

//play a soung and light up the key
function playNote(i){
    try{
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();

        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.type = "triangle";
        osc.frequency.value = notes[i];

        gain.gain.setValueAtTime(0.3, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audio.currentTime + 1.2);
    }catch(error){

    }

    const el = keyEls[i];

    if(el){
        el.classList.add("on");
        setTimeout(() => el.classList.remove("on"), 180);
    }
}

//play with computer keyboard
document.addEventListener("keydown", (e) =>{
    if(e.repeat || e.metaKey || e.ctrlKey) return;

    const i = keyMap[e.key.toLowerCase()];

    if(i !== undefined) playNote(i);
});

//day and night button
const themeBtn = document.getElementById("theme");
const root = document.documentElement;

function setTheme(isDark){
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
}

//start with users device setting
setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

themeBtn.addEventListener("click", () =>{
    setTheme(root.getAttribute("data-theme") !== "dark");
});