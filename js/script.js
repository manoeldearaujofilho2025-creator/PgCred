const botao = document.getElementById('btn-comecar')

botao.addEventListener("click", function(){
    botao.innerText = "Processando...";
    setTimeout(function(){
        botao.innerText = "✔ Pronto!";
    },2000)

});

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


// CONTADOR

const counters = document.querySelectorAll('.counter');

function startCounters(){
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const increment = target / 120;

        const updateCount = () => {
            count += increment;

            if(count < target){
                counter.innerText = Math.floor(count).toLocaleString('pt-BR');
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString('pt-BR') + '+';
            }
        };

        updateCount();
    });
}

let started = false;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.hero-stats');

    if(!started){
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){
            startCounters();
            started = true;
        }
    }
});


// SESSÃO FAQ

const faqs = document.querySelectorAll('.faq-item');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active');
    });
});

window.addEventListener("load", () => {
  document.querySelector(".hero-text").classList.add("show");
  document.querySelector(".hero-stats").classList.add("show");
  document.querySelector(".hero-cards").classList.add("show");
});


// BOTÃO HAMBURGUER 

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});