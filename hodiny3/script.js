const numberHours = document.querySelector(".number-hours");
const barSeconds = document.querySelector(".bar-seconds");

// Pole pro uložení HTML pro čísla hodin a značky sekund
const numberElement = [];
const barElement = [];

// Generování HTML pro čísla hodin (1 až 12)
for (let i = 1; i <= 12; i++) {
    numberElement.push(
        `<span style="--index:${i};"><p>${i}</p></span>`
    );
}

// Vložení čísel hodin do DOM
numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));

// Generování HTML pro značky sekund (1 až 60)
for (let i = 1; i <= 60; i++) {
    barElement.push(
        `<span style="--index:${i};"><p></p></span>`
    );
}

// Vložení značek sekund do DOM
barSeconds.insertAdjacentHTML("afterbegin", barElement.join(""));

// Výběr prvků pro ručičky hodin
const handHours = document.querySelector(".hand.hours");
const handMinutes = document.querySelector(".hand.minutes");
const handSeconds = document.querySelector(".hand.seconds");

// Výběr prvku pro výběr časového pásma
const timezoneSelector = document.getElementById("timezone-selector");

// Naplnění výběru časových pásem hlavními městy
function populateTimezones() {
    const timezones = [
        "Africa/Cairo", "Africa/Johannesburg",
        "Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata",
        "Europe/Prague", "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
        "America/New_York", "America/Los_Angeles", "America/Mexico_City",
        "America/Sao_Paulo", "America/Argentina/Buenos_Aires",
        "Australia/Sydney",
        "Antarctica/McMurdo"
    ];
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone.replace('_', ' ');
        timezoneSelector.appendChild(option);
    });

    // Nastavení výchozího časového pásma jako aktuálního uživatelského časového pásma
    timezoneSelector.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Volání funkce pro naplnění časových pásem
populateTimezones();

// Funkce pro získání a nastavení aktuálního času
function getCurrentTime() {
    let date = new Date();

    // Získání vybraného časového pásma
    let selectedTimeZone = timezoneSelector.value || Intl.DateTimeFormat().resolvedOptions().timeZone;
    let options = { timeZone: selectedTimeZone, hour12: false };

    // Získání aktuálního času ve vybraném časovém pásmu
    let currentTimeString = date.toLocaleTimeString('en-US', options);
    let [currentHours, currentMinutes, currentSeconds] = currentTimeString.split(':').map(Number);

    // Výpočet rotace pro každou ručičku
    handSeconds.style.transform = `rotate(${currentSeconds * 6}deg)`;
    handMinutes.style.transform = `rotate(${currentMinutes * 6}deg)`;
    handHours.style.transform = `rotate(${currentHours * 30 + currentMinutes / 2}deg)`;
}

// Volání funkce na začátku pro nastavení ručiček hodin
getCurrentTime();

// Nastavení intervalu pro aktualizaci ručiček hodin každou sekundu
setInterval(getCurrentTime, 1000); // 1000ms = 1s

// Zpracování chyb pro chybějící prvky
function checkElements() {
    if (!numberHours || !barSeconds || !handHours || !handMinutes || !handSeconds) {
        console.error("Jeden nebo více prvků chybí v DOM.");
    }
}

// Volání funkce pro zpracování chyb
checkElements();

// Zaznamenání aktuálního času do konzole pro ladění
function logCurrentTime() {
    let date = new Date();
    console.log(`Aktuální čas: ${date.toLocaleTimeString()}`);
}

// Volání funkce pro zaznamenání času na začátku a každou sekundu
logCurrentTime();
setInterval(logCurrentTime, 1000);

// Přidání posluchače událostí pro aktualizaci hodin při změně časového pásma
timezoneSelector.addEventListener("change", getCurrentTime);

// Vyčištění intervalů při opuštění stránky
window.addEventListener("unload", () => {
    clearInterval(getCurrentTime);
    clearInterval(logCurrentTime);
});
