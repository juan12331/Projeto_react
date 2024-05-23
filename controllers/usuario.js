// const { where } = require('sequelize');
const Turmas = require('../models/turmas');
const Usuario = require('../models/usuario');


exports.getAll = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios)
};


exports.getById = async (req, res) => {
  //no router id é o que vem depois do usuario/
  const idDoParam = req.params.id;
  const usuarioEncontrado = await Usuario.findOne({ where: { idUsuarios: idDoParam } }); res.json(usuarioEncontrado)
};

exports.createUsuario = async (req, res) => {
  const usuarioCadastrado = await Usuario.findOne({ where: { cpf: req.body.cpf } });
  //verificacao duplicidade de usuario cadasrtado
  if (usuarioCadastrado) {
    return res.send('Já existe um usuario cadastrado neste CPF.')
  }
  const usuarioCriado = await Usuario.create(req.body)

  if (usuarioCriado.idUsuarios) {
    await UsuariosTurmas.create({

      Turmas_idTurmas: req.body.idTurma,
      Usuario_idUsuarios: usuarioCriado.idUsuarios
    })
  }

  console.log("usuario Criado", usuarioCriado)
  return res.send("Usuario cadastrado com sucesso")
  //res.json(usuarios)

  if (usuarioCriado.idUsuarios) {

  }
};

exports.updateUsuario = async (req, res) => {
  const codigoUsuario = req.params.cpf;
  console.log(codigoUsuario)
  try {
    const usuarioCadastrado = await Usuario.findOne({ where: { cpf: codigoUsuario } }); // criando uma variavel que pega os parametros da rota

    if (usuarioCadastrado) {
      console.log('aqui', usuarioCadastrado)
      delete req.body.cpf;
      const [numRowsUpdate] = await Usuario.update(req.body, { // criando uma variavel array que 
        where: { cpf: codigoUsuario }
      });

      if (numRowsUpdate > 0) {
        const usuarioAtualizado = await Usuario.findOne({ where: { cpf: codigoUsuario } })
        return res.send({ message: 'usuario atualizado com sucesso', usuariocomdadosnovos: usuarioAtualizado })
      } else {
        return res.send('Usuario encontrado, mas sem nada a alterar')
      }

    } else {
      return res.status(404).send('Não existe usuario com esse cpf')
    }

  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    return res.status(500).send("Ocorreu um erro ao atualizar a turma.")

  } /* finally {
    res.send('código terminado') */
};