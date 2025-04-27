from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import os
import base64

app = FastAPI()

# Banco de dados simulado em memória
class Noticia(BaseModel):
    id: int
    titulo: str
    conteudo: str
    categoria: str
    imagem: Optional[str] = None  # Campo de imagem em base64, opcional
    tags: List[str] = []  # Lista de tags, opcional

noticias: List[Noticia] = []

# Montar a pasta do frontend
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# Rota para servir o index.html
@app.get("/", response_class=FileResponse)
def serve_index():
    return FileResponse("frontend/index.html")

# Endpoint para criar notícia (POST)
@app.post("/noticias")
def criar_noticia(noticia: Noticia):
    if noticia.imagem:
        # A imagem será salva com o ID da notícia como nome do arquivo
        imagem_path = f"frontend/images/{noticia.id}.jpg"
        
        # Criar diretório para imagens, se não existir
        if not os.path.exists("frontend/images"):
            os.makedirs("frontend/images")
        
        # Salvar a imagem diretamente como um arquivo
        try:
            with open(imagem_path, "wb") as f:
                f.write(base64.b64decode(noticia.imagem))  # Decodifica base64 para binário e escreve no arquivo
            noticia.imagem = f"/frontend/images/{noticia.id}.jpg"  # Atualiza o campo imagem para o caminho da imagem salva
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Erro ao salvar imagem: {str(e)}")

    noticias.append(noticia)
    return noticia

# Endpoint para listar todas as notícias (GET)
@app.get("/noticias")
def listar_noticias():
    return noticias

# Endpoint para atualizar uma notícia (PUT)
@app.put("/noticias/{id}")
def atualizar_noticia(id: int, noticia: Noticia):
    for i, n in enumerate(noticias):
        if n.id == id:
            noticias[i] = noticia
            return noticia
    raise HTTPException(status_code=404, detail="Notícia não encontrada")

# Endpoint para deletar uma notícia (DELETE)
@app.delete("/noticias/{id}")
def deletar_noticia(id: int):
    global noticias
    noticias = [n for n in noticias if n.id != id]
    return {"mensagem": "Notícia deletada"}