document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // TOAST
  // =====================
  function showToast(msg, tipo = "success") {
    let toast = document.getElementById("toast-global");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-global";
      toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: #111827;
        border: 1px solid #1e293b;
        border-radius: 12px;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.875rem;
        font-family: Arial, Helvetica, sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        transform: translateY(80px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
        min-width: 260px;
        color: white;
      `;
      document.body.appendChild(toast);
    }

    const cor = tipo === "success" ? "#3B82F6" : "#ef4444";
    const icone = tipo === "success" ? "✔" : "✖";

    toast.style.borderColor =
      tipo === "success" ? "rgba(59,130,246,0.3)" : "rgba(239,68,68,0.3)";
    toast.innerHTML = `
      <span style="color:${cor}; font-size:1rem;">${icone}</span>
      <span>${msg}</span>
    `;

    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";

    setTimeout(() => {
      toast.style.transform = "translateY(80px)";
      toast.style.opacity = "0";
    }, 3500);
  }

  // =====================
  // BOTÃO COMECAR
  // =====================
  const botao = document.getElementById("btn-comecar");

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
  const counters = document.querySelectorAll(".counter");
  let started = false;

  function startCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / 120;

      const updateCount = () => {
        count += increment;

        if (count < target) {
          counter.innerText = Math.floor(count).toLocaleString("pt-BR");
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toLocaleString("pt-BR") + "+";
        }
      };

      updateCount();
    });
  }

  window.addEventListener("scroll", () => {
    const section = document.querySelector(".hero-stats");

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
  const faqs = document.querySelectorAll(".faq-item");

  faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
      faq.classList.toggle("active");
    });
  });

  // =====================
  // MENU HAMBURGUER
  // =====================
  const menuToggle = document.getElementById("menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("active");
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

  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block";
    });
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    if (loginModal && e.target === loginModal)
      loginModal.style.display = "none";
    if (registerModal && e.target === registerModal)
      registerModal.style.display = "none";
  });

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

      if (!email || !senha) {
        showToast("Preencha todos os campos.", "error");
        return;
      }

      if (senha.length < 6) {
        showToast("A senha deve ter pelo menos 6 caracteres.", "error");
        return;
      }

      btnLogin.innerText = "Entrando...";
      btnLogin.disabled = true;

      try {
        const resposta = await fetch(
          "https://pgcred-production.up.railway.app/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
          },
        );

        const dados = await resposta.json();

        if (resposta.ok) {
          localStorage.setItem("token", dados.token);
          localStorage.setItem("usuarioEmail", email);

          showToast("Login realizado com sucesso!");

          if (loginModal) loginModal.style.display = "none";

          // Redireciona após o toast aparecer
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1000);
        } else {
          showToast(dados.mensagem || "Email ou senha inválidos.", "error");
        }
      } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        showToast("Erro ao conectar com o servidor. Tente novamente.", "error");
      } finally {
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

      if (!nome || !email || !senha) {
        showToast("Preencha todos os campos.", "error");
        return;
      }

      if (senha.length < 6) {
        showToast("A senha deve ter pelo menos 6 caracteres.", "error");
        return;
      }

      btnCadastro.innerText = "Criando conta...";
      btnCadastro.disabled = true;

      try {
        const resposta = await fetch(
          "https://pgcred-production.up.railway.app/cadastro",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
          },
        );

        const dados = await resposta.json();

        if (resposta.ok) {
          showToast("Conta criada com sucesso! Faça login para continuar.");

          document.getElementById("regName").value = "";
          document.getElementById("emailCadastro").value = "";
          document.getElementById("senhaCadastro").value = "";

          setTimeout(() => {
            if (registerModal) registerModal.style.display = "none";
            if (loginModal) loginModal.style.display = "block";
          }, 1500);
        } else {
          showToast(dados.mensagem || "Erro ao criar conta.", "error");
        }
      } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        showToast("Erro ao conectar com o servidor. Tente novamente.", "error");
      } finally {
        btnCadastro.innerText = "Criar conta";
        btnCadastro.disabled = false;
      }
    });
  }

  // =====================
  // FETCH BACKEND (teste de conexão)
  // =====================
  fetch("https://pgcred-production.up.railway.app")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("Erro ao conectar com o servidor:", err);
    });
});
