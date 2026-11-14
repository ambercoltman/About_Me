const fliesBox = document.getElementById("flies");

for(let i = 0; i<22; i++){
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
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) =>{
            if(entry.isIntersecting) {
                entry.target.classList.add("in");
                observer.unobserve(entry.target);
            }
        });
    },
    {threshold: 0.15}
);

document.querySelectorAll(".reveal").forEach((el, i) =>{
    el.style.transitionDelay =(i%4) * 80 + "ms";
    observer.observe(el);
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