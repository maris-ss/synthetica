from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

class Post(BaseModel):
    content: str
    likes: int = 0

posts = []

@app.get("/", response_class=HTMLResponse)
async def get_form():
    with open("frontend/index.html", "r") as f:
        return HTMLResponse(content=f.read(), status_code=200)

@app.post("/add_post")
async def add_post(post: Post):
    posts.append({"content": post.content, "likes": post.likes})
    return {"message": "Post adicionado com sucesso!"}

@app.get("/posts")
async def get_posts():
    return {"posts": posts}
