const form = document.getElementById("news-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = form.titulo.value;
  const conteudo = form.conteudo.value;
  const categoria = form.tipo.value;
  const tagsInput = form.tags.value; // Get the tags input
  const tags = tagsInput.split(",").map((tag) => tag.trim()); // Split by commas and trim whitespace
  const imagemInput = document.getElementById("imageInput");
  const imagemFile = imagemInput.files[0]; // Get the image file, if any

  let imagemBase64 = null;

  if (imagemFile) {
    try {
      imagemBase64 = await toBase64(imagemFile); // Convert the image to base64
    } catch (err) {
      console.error("Erro ao converter imagem para base64:", err);
      alert("Erro ao processar a imagem. Tente novamente.");
      return;
    }
  }

  enviarNoticia(titulo, conteudo, categoria, tags, imagemBase64);
});

async function enviarNoticia(
  titulo,
  conteudo,
  categoria,
  tags = [],
  imagemBase64 = null
) {
  const novaNoticia = {
    id: Date.now(), // Generate a unique ID for the noticia
    titulo,
    conteudo,
    categoria,
    tags, // Include the tags
    imagem: imagemBase64 || null, // Send the image in base64 (if available)
  };

  try {
    const res = await fetch("/noticias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaNoticia),
    });

    if (res.ok) {
      form.reset();
      buscarNoticias();
    } else {
      console.log("Erro no response:", await res.text());
      alert("Erro ao cadastrar notícia.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar a notícia.");
  }
}

// Função para converter arquivo para base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove o prefixo "data:image/..."
    reader.onerror = (error) => reject(error);
  });
}

async function buscarNoticias() {
  try {
    const res = await fetch("/noticias");
    const noticias = await res.json();

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const container = document.getElementById("noticias-container");
    container.innerHTML = "";

    noticias.forEach((noticia) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
  <div class="noticia-header">
    <div class="noticia-info">
      <div class="autor-noticia">
        <img src="${
          usuarioLogado?.avatar || "../frontend/image/default.jpg"
        }" alt="Avatar do autor" class="autor-avatar">
        <div class="autor-info">
          <p class="autor-nome">${usuarioLogado?.name || "Usuário"}</p>
          <p class="autor-username">@${usuarioLogado?.username || "usuario"}</p>
        </div>
      </div>
        <p class="noticia-categoria">Categoria: ${noticia.categoria}.</p>
      <h3>${noticia.titulo}</h3>
    </div>
    <div class="noticia-img">
      <img src="${
        noticia.imagem || "../frontend/image/default.jpg"
      }" alt="Imagem da notícia">
    </div>
  </div>

  <p class="noticia-conteudo">${noticia.conteudo}</p>
  <div class="noticia-footer">
    <span class="noticia-tags">${noticia.tags.join(", ") || "Sem tags"}</span>
    <div class="card-icons">
      <i class='bx bx-edit-alt' title="Editar" onclick="editarNoticia(${
        noticia.id
      })"></i>
      <i class='bx bx-trash' title="Excluir" onclick="deletarNoticia(${
        noticia.id
      })"></i>
    </div>
  </div>
`;


      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
  }
}

async function deletarNoticia(id) {
  try {
    const res = await fetch(`/noticias/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      buscarNoticias();
    } else {
      alert("Erro ao deletar notícia.");
    }
  } catch (err) {
    console.error(err);
  }
}

async function editarNoticia(id) {
  try {
    const res = await fetch("/noticias");
    const noticias = await res.json();
    const noticia = noticias.find((n) => n.id === id);

    if (noticia) {
      form.titulo.value = noticia.titulo;
      form.conteudo.value = noticia.conteudo;
      form.tipo.value = noticia.categoria;

      form.onsubmit = async (e) => {
        e.preventDefault();
        const atualizada = {
          id: noticia.id,
          titulo: form.titulo.value,
          conteudo: form.conteudo.value,
          categoria: form.tipo.value,
        };

        const res = await fetch(`/noticias/${noticia.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(atualizada),
        });

        if (res.ok) {
          form.reset();
          form.onsubmit = null;
          buscarNoticias();
        } else {
          alert("Erro ao editar notícia.");
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", buscarNoticias);
