/* =====================================================
   G.A.I.A – JARVIS STYLE BOOT SEQUENCE
   ===================================================== */

const LOG_LINES = [
    "Initializing AI core...",
    "Loading gesture recognition module...",
    "Activating speech engine...",
    "Establishing neural pathways...",
    "Synchronizing system modules...",
    "System ready."
];

const logContainer = document.querySelector(".system-log");
const statusText = document.querySelector(".system-status span");
const enterBtn = document.querySelector(".enter-btn");
const skipBtn = document.querySelector(".skip-btn");

let lineIndex = 0;
let redirectTriggered = false;

/* -----------------------------
   Typing Effect
----------------------------- */
function typeLine(text, callback) {
    const p = document.createElement("p");
    logContainer.appendChild(p);

    let charIndex = 0;
    const typing = setInterval(() => {
        p.textContent += text.charAt(charIndex);
        charIndex++;

        if (charIndex === text.length) {
            clearInterval(typing);
            if (callback) setTimeout(callback, 500);
        }
    }, 40);
}

function startTyping() {
    if (lineIndex < LOG_LINES.length) {
        typeLine(LOG_LINES[lineIndex], () => {
            lineIndex++;
            startTyping();
        });
    }
}

/* -----------------------------
   Status Change
----------------------------- */
function setOnlineStatus() {
    if (statusText) {
        statusText.textContent = "ONLINE";
        statusText.style.color = "#22d3ee";
    }
}

/* -----------------------------
   Enter GAIA
----------------------------- */
function enterGaia() {
    if (redirectTriggered) return;
    redirectTriggered = true;

    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "gaia.html";
    }, 1000);
}

/* -----------------------------
   Auto Redirect (Cinematic)
----------------------------- */
function autoRedirect() {
    setTimeout(() => {
        setOnlineStatus();
    }, 5200);

    setTimeout(() => {
        enterGaia();
    }, 7000);
}

/* -----------------------------
   Mouse Parallax (Desktop only)
----------------------------- */
if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        const grid = document.querySelector(".ai-grid");
        const scan = document.querySelector(".scan-line");

        if (grid) grid.style.transform = `translate(${x}px, ${y}px)`;
        if (scan) scan.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
    });
}

/* -----------------------------
   Button Events
----------------------------- */
if (enterBtn) enterBtn.addEventListener("click", enterGaia);
if (skipBtn) skipBtn.addEventListener("click", enterGaia);

/* -----------------------------
   Init
----------------------------- */
window.addEventListener("load", () => {
    startTyping();
    autoRedirect();
});

/* =========================================
   Cinematic Fade Transition (GAIA Intro)
   ========================================= */
document.querySelectorAll(".gaia-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.href;

        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = target;
        }, 800);
    });
});
