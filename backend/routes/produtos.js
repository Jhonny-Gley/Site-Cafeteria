const express = require("express");
const router = express.Router();
const produtos = require("../data/produtos");

router.get("/", (req, res) => {
    res.json(produtos);
});

router.get("/:id", (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
});

router.post("/", (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        nome: req.body.nome,
        preco: req.body.preco
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

module.exports = router;