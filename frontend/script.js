document.getElementById("item-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const postContent = document.getElementById("item").value;
    if (!postContent.trim()) return; 

    const response = await fetch("/add_post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: postContent, likes: 0 }),
    });

    const result = await response.json();
    if (result.message) {
        addItemToList(postContent); 
    }
    

    document.getElementById("item").value = "";
});

function addItemToList(item) {
    const itemList = document.getElementById("item-list");
    const li = document.createElement("li");
    li.classList.add("post");

    // Criando a imagem do usuário
    const avatar = document.createElement("img");
    avatar.src = "/frontend/image/WhatsApp Image 2025-03-27 at 08.35.21.jpeg";
    avatar.alt = "Avatar";
    avatar.classList.add("avatar");

    // Criando a div que contém o conteúdo do post
    const postContent = document.createElement("div");
    postContent.classList.add("post-content");

    // Criando o nome de usuário e o @
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    const username = document.createElement("span");
    username.textContent = "mar!s <3";
    username.classList.add("username");

    const userHandle = document.createElement("span");
    userHandle.textContent = " @wmaristhkabt";
    userHandle.classList.add("user-handle");

    userInfo.appendChild(username);
    userInfo.appendChild(userHandle);

    // Criando a mensagem do post
    const message = document.createElement("p");
    message.textContent = item;
    message.classList.add("message");

    // Criando o grupo de botões
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Botão de comentar com Boxicon
    const commentButton = document.createElement("button");
    commentButton.innerHTML = '<i class="bx bx-comment"></i>'; // Ícone de comentário

    // Botão de repostar com Boxicon
    const repostButton = document.createElement("button");
    repostButton.innerHTML = '<i class="bx bx-repost"></i>'; // Ícone de repost

    // Botão de curtir com Boxicon
    const likeButton = document.createElement("button");
    likeButton.innerHTML = '<i class="bx bx-heart"></i>'; // Ícone de coração vazio
    likeButton.addEventListener("click", function () {
        likeButton.innerHTML = '<i class="bx bxs-heart"></i>'; // Ícone de coração cheio
    });

    // Botão de bookmark com Boxicon
    const bookmarkButton = document.createElement("button");
    bookmarkButton.innerHTML = '<i class="bx bx-bookmark"></i>'; // Ícone de bookmark
    bookmarkButton.addEventListener("click", function () {
        if (bookmarkButton.innerHTML === '<i class="bx bx-bookmark"></i>') {
            bookmarkButton.innerHTML = '<i class="bx bxs-bookmark"></i>'; // Ícone de bookmark preenchido
        } else {
            bookmarkButton.innerHTML = '<i class="bx bx-bookmark"></i>'; // Ícone de bookmark vazio
        }
    });

    // Botão de excluir com Boxicon
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="bx bx-trash"></i>'; // Ícone de lixeira
    deleteButton.addEventListener("click", function () {
        itemList.removeChild(li);
    });

    // Botão de exportar com Boxicon
    const exportButton = document.createElement("button");
    exportButton.innerHTML = '<i class="bx bx-export"></i>'; // Ícone de exportar

    // Adicionando os botões ao grupo
    buttonGroup.appendChild(commentButton);
    buttonGroup.appendChild(repostButton);
    buttonGroup.appendChild(likeButton);
    buttonGroup.appendChild(bookmarkButton);
    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(exportButton);

    // Montando o post
    postContent.appendChild(userInfo);
    postContent.appendChild(message);
    postContent.appendChild(buttonGroup);

    li.appendChild(avatar);
    li.appendChild(postContent);

    itemList.appendChild(li);
}
