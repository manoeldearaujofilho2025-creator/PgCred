document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // BOTÃO COMECAR
  // =====================
  const botao = document.getElementById('btn-comecar');

  if (botao) {
    botao.addEventListener("click", function () {
      botao.innerText = "Processando...";
      setTimeout(function () {
        botao.innerText = "✔ Pronto!";
      }, 2000);
    });
  }


  // =====================
  // REVEAL NO SCROLL
  // =====================
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


  // =====================
  // CONTADOR ANIMADO
  // =====================
  const counters = document.querySelectorAll('.counter');
  let started = false;

  function startCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 120;

      const updateCount = () => {
        count += increment;

        if (count < target) {
          counter.innerText = Math.floor(count).toLocaleString('pt-BR');
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toLocaleString('pt-BR') + '+';
        }
      };

      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const section = document.querySelector('.hero-stats');

    if (section && !started) {
      const top = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        startCounters();
        started = true;
      }
    }
  });


  // =====================
  // ANIMAÇÃO DE LOAD (HERO)
  // =====================
  const heroText = document.querySelector(".hero-text");
  const heroStats = document.querySelector(".hero-stats");
  const heroCards = document.querySelector(".hero-cards");

  if (heroText) heroText.classList.add("show");
  if (heroStats) heroStats.classList.add("show");
  if (heroCards) heroCards.classList.add("show");


  // =====================
  // FAQ ACCORDION
  // =====================
  const faqs = document.querySelectorAll('.faq-item');

  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });


  // =====================
  // MENU HAMBURGUER
  // =====================
  const menuToggle = document.getElementById("menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("show-menu");
    });
  }


  // =====================
  // MODAIS LOGIN / REGISTRO
  // =====================
  const loginBtn = document.querySelector(".btn-acessar");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const closeButtons = document.querySelectorAll(".modal .close");
  const openRegister = document.getElementById("openRegister");
  const openLogin = document.getElementById("openLogin");

  // Abrir modal de login
  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block";
    });
  }

  // Fechar modais ao clicar no X
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "none";
    });
  });

  // Fechar modais ao clicar fora
  window.addEventListener("click", (e) => {
    if (loginModal && e.target === loginModal) loginModal.style.display = "none";
    if (registerModal && e.target === registerModal) registerModal.style.display = "none";
  });

  // Alternar entre login e registro
  if (openRegister) {
    openRegister.addEventListener("click", (e) => {
      e.preventDefault();
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "block";
    });
  }

  if (openLogin) {
    openLogin.addEventListener("click", (e) => {
      e.preventDefault();
      if (registerModal) registerModal.style.display = "none";
      if (loginModal) loginModal.style.display = "block";
    });
  }


  // =====================
  // LOGIN
  // =====================
  const btnLogin = document.getElementById("btn-login");

  if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();

      // Validação básica no frontend
      if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      // Feedback visual no botão
      btnLogin.innerText = "Entrando...";
      btnLogin.disabled = true;

      try {
        const resposta = await fetch("https://pgcred-production.up.railway.app/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          // Salva o token no localStorage para usar nas próximas requisições
          localStorage.setItem("token", dados.token);
          localStorage.setItem("usuarioEmail", email);

          alert("Login realizado com sucesso!");
          if (loginModal) loginModal.style.display = "none";

          // Redirecione para o painel após login (ajuste a rota conforme necessário)
          window.location.href = "dashboard.html";
        } else {
          alert(dados.mensagem || "Email ou senha inválidos.");
        }

      } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        alert("Erro ao conectar com o servidor. Tente novamente.");
      } finally {
        // Restaura o botão independente do resultado
        btnLogin.innerText = "Entrar";
        btnLogin.disabled = false;
      }
    });
  }


  // =====================
  // CADASTRO
  // =====================
  const btnCadastro = document.getElementById("btn-cadastro");

  if (btnCadastro) {
    btnCadastro.addEventListener("click", async () => {
      const nome = document.getElementById("regName").value.trim();
      const email = document.getElementById("emailCadastro").value.trim();
      const senha = document.getElementById("senhaCadastro").value.trim();

      // Validação básica no frontend
      if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      // Feedback visual no botão
      btnCadastro.innerText = "Criando conta...";
      btnCadastro.disabled = true;

      try {
        const resposta = await fetch("https://pgcred-production.up.railway.app/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          alert("Conta criada com sucesso! Faça login para continuar.");

          // Limpa os campos e vai para o modal de login
          document.getElementById("regName").value = "";
          document.getElementById("emailCadastro").value = "";
          document.getElementById("senhaCadastro").value = "";

          if (registerModal) registerModal.style.display = "none";
          if (loginModal) loginModal.style.display = "block";
        } else {
          alert(dados.mensagem || "Erro ao criar conta.");
        }

      } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao conectar com o servidor. Tente novamente.");
      } finally {
        btnCadastro.innerText = "Criar conta";
        btnCadastro.disabled = false;
      }
    });
  }


  // =====================
  // FETCH BACKEND (teste de conexão)
  // =====================
  // ⚠️ Troque a URL abaixo pelo endereço real do seu servidor em produção
  fetch('https://pgcred-production.up.railway.app')
    .then(res => res.text())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error('Erro ao conectar com o servidor:', err);
    });

});