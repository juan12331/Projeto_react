// routes/router.js
//nesse arquivo estarão todas as rotas
//no caso de um proj com muitas rotas é possível quebrar as rotas em mais arquivos
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");
const turmasController = require("../controllers/turmas");

//retorna todos usuarios
router.get("/usuario", usuarioController.getAll);
router.get("/usuario/:id", usuarioController.getById);

//cria um usuario passando informação no body
router.post("/usuario", usuarioController.createUsuario);
router.put("/usuario/:cpf", usuarioController.updateUsuario)

//INSERIR OUTRAS ROTAS -->
// TURMAS -->
router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasController.getById) 

router.post("/turmas", turmasController.createTurma)

router.put("/turmas/:codigo", turmasController.updateTurma)

// router.get('/turmas', turmas Controller.getAll)
// router.get('/turmas/:id', turmasController.getById) 
/* router.get('/usuario', usuarioController.listarUsuarios) */

module.exports = router;
