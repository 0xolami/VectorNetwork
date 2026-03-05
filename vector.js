 const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        /* Scroll Reveal */
        const sections = document.querySelectorAll("section");

        window.addEventListener("scroll", () => {
            sections.forEach(sec => {
                const top = window.scrollY;
                const offset = sec.offsetTop - 400;
                if (top > offset) {
                    sec.classList.add("show");
                }
            });
        });


const counters = document.querySelectorAll(".counter");
let started = false;

function startCounters() {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                if (target >= 1000) {
                    counter.innerText = (target / 1000) + "K+";
                } else {
                    counter.innerText = target + "+";
                }
            }
        };
        updateCount();
    });
}

window.addEventListener("scroll", () => {
    const section = document.getElementById("experience");
    const sectionTop = section.offsetTop - 400;

    if (!started && window.scrollY > sectionTop) {
        startCounters();
        started = true;
    }
});


const cards = document.querySelectorAll(".founder-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

});