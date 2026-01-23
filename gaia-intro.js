const logLines = [
    "Initializing AI core...",
    "Loading gesture recognition module...",
    "Calibrating speech engine...",
    "Establishing neural pathways...",
    "System synchronization complete."
];

const logContainer = document.querySelector(".system-log");
let lineIndex = 0;

function typeLine(text, callback) {
    let charIndex = 0;
    const p = document.createElement("p");
    logContainer.appendChild(p);

    const typingInterval = setInterval(() => {
        p.textContent += text.charAt(charIndex);
        charIndex++;

        if (charIndex === text.length) {
            clearInterval(typingInterval);
            if (callback) setTimeout(callback, 600);
        }
    }, 40);
}

function startTypingLogs() {
    if (lineIndex < logLines.length) {
        typeLine(logLines[lineIndex], () => {
            lineIndex++;
            startTypingLogs();
        });
    }
}

window.addEventListener("load", () => {
    startTypingLogs();
});

setTimeout(() => {
    const status = document.querySelector(".status-text span");
    if (status) {
        status.textContent = "ONLINE";
        status.style.color = "#00eaff";
    }
}, 5500);

if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        document.querySelector(".grid-bg").style.transform =
            `translate(${x}px, ${y}px)`;

        document.querySelector(".hud-bg").style.transform =
            `translate(${-x}px, ${-y}px)`;
    });
}

setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "0";
}, 6500);
