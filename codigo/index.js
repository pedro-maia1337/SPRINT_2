const express = require("express");
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "db")));

const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

// Configurações do JSON Server
app.use(middlewares);
app.use("/api", router); // Rotas para a API JSON

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota para servir a página HTML
app.get("/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modules/tutoriais/index.html"));
});

// Inicializando o servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});