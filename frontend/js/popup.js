document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("form-container");
  const btnExpandir = document.getElementById("btnExpandir");
  const btnFechar = document.getElementById("btnFechar");
  const postar = document.getElementById("postar");
  const btnAbrirFormulario = document.getElementById("btnAbrirFormulario");

  // Certifique-se de que a popup está escondida no carregamento da página
  postar.classList.remove("aberto");
  postar.style.display = "none"; // Garante que a popup esteja escondida inicialmente

  // Clique no botão "nova notícia" para abrir a popup
  btnAbrirFormulario.addEventListener("click", () => {
    postar.classList.add("aberto"); // Adiciona a classe 'aberto'
    postar.style.display = "block"; // Exibe a popup
  });

  // Clique no botão de expandir/reduzir
  btnExpandir.addEventListener("click", () => {
    formContainer.classList.toggle("expanded");

    if (formContainer.classList.contains("expanded")) {
      btnExpandir.classList.remove("bx-expand");
      btnExpandir.classList.add("bx-collapse");

      // Expande
      postar.style.top = "5vh";
      postar.style.left = "5vw";
      postar.style.width = "90vw";
      postar.style.height = "90vh";
      postar.style.transform = "none"; // Remove a centralização
    } else {
      btnExpandir.classList.remove("bx-collapse");
      btnExpandir.classList.add("bx-expand");

      // Reduz
      postar.style.top = "50%";
      postar.style.left = "50%";
      postar.style.width = "40vw";
      postar.style.height = "80vh";
      postar.style.transform = "translate(-50%, -50%)"; // Volta a centralização
    }
  });

  // Clique no botão de fechar para fechar a popup
  btnFechar.addEventListener("click", () => {
    postar.classList.remove("aberto"); // Remove a classe 'aberto'
    postar.style.display = "none"; // Esconde a popup
    formContainer.classList.remove("expanded"); // Garante que a popup volte ao tamanho original
    postar.style.top = "50%";
    postar.style.left = "50%";
    postar.style.width = "40vw";
    postar.style.height = "80vh";
    postar.style.transform = "translate(-50%, -50%)"; // Restaura a centralização
  });

  // Upload de imagem
  const uploadIcon = document.getElementById("uploadIcon");
  const imageInput = document.getElementById("imageInput");

  uploadIcon.addEventListener("click", () => {
    imageInput.click();
  });
});
