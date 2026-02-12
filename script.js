/* ============================= */
/* ELEMENTS */
/* ============================= */

const loginForm = document.getElementById("loginForm");
const card = document.getElementById("loginCard");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = loginForm ? loginForm.querySelector("button") : null;

let attempts = 0;
let isLocked = false;

/* ============================= */
/* SHOW / HIDE PASSWORD */
/* ============================= */

togglePassword?.addEventListener("click", () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
});

/* ============================= */
/* LOGIN SYSTEM */
/* ============================= */

loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isLocked) return;

    const nameInput = document.getElementById("username");
    const name = nameInput.value.trim();
    const password = passwordInput.value.trim();

    const validNames = ["Carl", "Hanna"];
    const validPassword = "122025";

    // Reset errors
    nameInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    // Show spinner
    loginBtn.innerHTML = `<div class="spinner"></div>`;
    loginBtn.disabled = true;

    setTimeout(() => {

        if (validNames.includes(name) && password === validPassword) {

            card.classList.add("success");

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userName", name);

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } else {

            attempts++;

            card.classList.add("shake");
            nameInput.classList.add("input-error");
            passwordInput.classList.add("input-error");

            setTimeout(() => {
                card.classList.remove("shake");
            }, 400);

            if (attempts >= 3) {
                lockSystem();
            }
        }

        loginBtn.innerHTML = "Login";
        loginBtn.disabled = false;

    }, 1200); // fake loading delay
});

/* ============================= */
/* LOCK SYSTEM (3 ATTEMPTS) */
/* ============================= */

function lockSystem() {
    isLocked = true;
    let seconds = 30;

    loginBtn.innerText = `Locked (${seconds}s)`;
    loginBtn.disabled = true;

    const countdown = setInterval(() => {
        seconds--;
        loginBtn.innerText = `Locked (${seconds}s)`;

        if (seconds <= 0) {
            clearInterval(countdown);
            attempts = 0;
            isLocked = false;
            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
        }
    }, 1000);
}

/* ============================= */
/* PROTECT HOME PAGE */
/* ============================= */

if (window.location.pathname.includes("home.html")) {

    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }

    /* Typing Animation */
    const text = "I love you and Will always love you My Habibti, Will you be my valentine po? 💖";
    const typeElement = document.getElementById("typeText");

    if (typeElement) {
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typeElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        typeWriter();
    }
}

/* ============================= */
/* LOVE BUTTON REACTION */
/* ============================= */

function loveAnswer() {
    const message = document.getElementById("loveMessage");
    if (message) {
        message.innerHTML = "Thanks you for choosing me Habibti, there's a part 2 on feb 14. I love you soooo much, My Future Wifey 🥰🌹💞";
    }
}

/* ============================= */
/* LOGOUT */
/* ============================= */

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
