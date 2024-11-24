const express = require("express");
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "db")));

const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();


app.use(middlewares);
app.use("/api", router); 


app.use(express.static(path.join(__dirname, "public")));


app.get("/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modules/tutoriais/index.html"));
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});