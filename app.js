// Toggle button
let toggle = document.querySelector(".toggle-btn");
let navBar = document.querySelector(".navbar");
let cards = document.querySelectorAll(".card");
let difficulties = document.querySelectorAll(".difficulty");
let sources = document.querySelectorAll(".source");
const footer = document.querySelector('footer');
let isDark = true;

toggle.addEventListener('click', () => {
    if (isDark) {
        // Switch to light mode
        navBar.style.backgroundColor = '#FFFFFF';
        document.querySelector(".navbar p").style.color = '#000000';
        document.querySelector(".toggle-btn img").src = 'assets/sun.png';

        cards.forEach(card => {
            card.style.backgroundColor = '#FFFFFF';
            card.style.color = '#000000';
        });

        difficulties.forEach(diff => {
            diff.style.backgroundColor = '#f1f5f9';
            diff.style.color = '#5f6c7d';
        });

        sources.forEach(src => {
            src.style.backgroundColor = '#f1f5f9';
            src.style.color = '#5f6c7d';
        });
        footer.style.backgroundColor = '#FFFFFF';
        footer.style.color = '#000000';


        footer.querySelectorAll('a').forEach(link => {
            link.style.color = '#000000';
        });
        footer.querySelectorAll('img').forEach(img => {
            img.style.filter = 'none'; 
        });
        document.querySelector('.footer-tagline').style.color = '#646c7d';

    } else {
        // Switch to dark mode
        navBar.style.backgroundColor = '#020617';
        document.querySelector(".navbar p").style.color = '#FFFFFF';
        document.querySelector(".toggle-btn img").src = 'assets/moon.png';

        cards.forEach(card => {
            card.style.backgroundColor = '#020617';
            card.style.color = '#FFFFFF';
        });

        difficulties.forEach(diff => {
            diff.style.backgroundColor = '#334155';
            diff.style.color = '#cbd5e1';
        });

        sources.forEach(src => {
            src.style.backgroundColor = '#334155';
            src.style.color = '#cbd5e1';
        });
        footer.style.backgroundColor = '#020617';
        footer.style.color = '#FFFFFF';

        footer.querySelectorAll('a').forEach(link => {
            link.style.color = '#FFFFFF';
        });
        footer.querySelectorAll('img').forEach(img => {
            img.style.filter = 'brightness(0) invert(1)';
        });
    }

    isDark = !isDark;
});



document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const link = card.getAttribute("data-link");
        if (link) {
            window.open(link, "_blank"); 
        }
    });
});
