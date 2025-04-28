document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("form-container");
  const btnExpandir = document.getElementById("btnExpandir");
  const btnFechar = document.getElementById("btnFechar");
  const postar = document.getElementById("postar");
  const btnAbrirFormulario = document.getElementById("btnAbrirFormulario");

  postar.classList.remove("aberto");
  postar.style.display = "none"; 

  btnAbrirFormulario.addEventListener("click", () => {
    postar.classList.add("aberto"); 
    postar.style.display = "block"; 
  });

  btnExpandir.addEventListener("click", () => {
    formContainer.classList.toggle("expanded");

    if (formContainer.classList.contains("expanded")) {
      btnExpandir.classList.remove("bx-expand");
      btnExpandir.classList.add("bx-collapse");

      postar.style.top = "5vh";
      postar.style.left = "5vw";
      postar.style.width = "90vw";
      postar.style.height = "90vh";
      postar.style.transform = "none"; 
    } else {
      btnExpandir.classList.remove("bx-collapse");
      btnExpandir.classList.add("bx-expand");

      postar.style.top = "50%";
      postar.style.left = "50%";
      postar.style.width = "40vw";
      postar.style.height = "80vh";
      postar.style.transform = "translate(-50%, -50%)"; 
    }
  });

  btnFechar.addEventListener("click", () => {
    postar.classList.remove("aberto");
    postar.style.display = "none"; 
    formContainer.classList.remove("expanded"); 
    postar.style.top = "50%";
    postar.style.left = "50%";
    postar.style.width = "40vw";
    postar.style.height = "80vh";
    postar.style.transform = "translate(-50%, -50%)"; 
  });

  const uploadIcon = document.getElementById("uploadIcon");
  const imageInput = document.getElementById("imageInput");

  uploadIcon.addEventListener("click", () => {
    imageInput.click();
  });
});