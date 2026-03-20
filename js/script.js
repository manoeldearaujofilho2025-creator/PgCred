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


// Seleciona botão "Acessar" e modal
const loginBtn = document.querySelector(".btn-acessar");
const loginModal = document.getElementById("loginModal");
const closeModal = document.querySelector(".modal .close");

// Abrir modal
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});

// Fechar modal ao clicar no X
closeModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {
  // MENU MOBILE
  const menuToggle = document.getElementById("menu-toggle");
  const navUl = document.querySelector("nav ul");

  menuToggle.addEventListener("click", () => {
    navUl.classList.toggle("show-menu");
  });

  // MODAIS LOGIN / REGISTRO
  const loginBtn = document.querySelector(".btn-acessar");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const closeButtons = document.querySelectorAll(".modal .close");
  const openRegister = document.getElementById("openRegister");
  const openLogin = document.getElementById("openLogin");

  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  closeButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
    })
  );

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === registerModal) registerModal.style.display = "none";
  });

  openRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "block";
  });

  openLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "none";
    loginModal.style.display = "block";
  });
});