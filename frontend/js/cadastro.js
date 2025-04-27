let selectedAvatar = null;

function openPopup() {
  console.log("Popup foi aberta");
  document.getElementById("popup-overlay").style.display = "flex";
  document.body.classList.add("modal-open");
}

function closePopup() {
  console.log("Popup foi fechada");
  document.getElementById("popup-overlay").style.display = "none";
  document.body.classList.remove("modal-open");
}

function selectAvatar(img) {
  console.log("Avatar clicado:", img.src);
  document
    .querySelectorAll(".avatars img")
    .forEach((i) => i.classList.remove("selected"));
  img.classList.add("selected");
  selectedAvatar = img.src;
}

function cadastrar() {
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !username || !email || !password || !selectedAvatar) {
    alert("Preencha todos os campos e selecione uma foto.");
    return;
  }

  closePopup();
  document.querySelector(".login").style.display = "none";

  document.getElementById("profile-pic").src = selectedAvatar;
  document.getElementById("profile-name").innerText = name;
  document.getElementById("profile-username").innerText = "@" + username;

  document.getElementById("info-name").innerText = name;
  document.getElementById("info-email").innerText = email;

  document.getElementById("profile").style.display = "flex";

  // Salvar no localStorage
  const userData = {
    name: name,
    username: username,
    avatar: selectedAvatar,
  };
  localStorage.setItem("usuarioLogado", JSON.stringify(userData));
}

// Fecha ao clicar fora da popup
document
  .getElementById("popup-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closePopup();
    }
  });

// Fecha com tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopup();
  }
});
