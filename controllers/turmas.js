// chamando turmas
const Turmas = require('../models/turmas');

//
exports.getAll = async (req, res) => {
    const turmas = await Turmas.findAll();
    res.json(turmas)
};

exports.getById = async (req, res) => {
    const idDoParam = req.params.id;
    const turmaEncontrada = await  Turmas.findOne({idTurmas: idDoParam});
    res.json(turmaEncontrada)
};

exports.createTurma = async (req, res) => {
    const turmasCadastrado = await Turmas.findOne({ where: {codigo : req.body.codigo}}); 
    if (turmasCadastrado) {
        return res.send('Já existe uma turma cadastrada neste codigo, viadinho.')
    }

    const turmaCriada = await Turmas.create(req.body);
    console.log("nova turma criada", turmaCriada);
    return res.send("funcionou ;P")
};

exports.updateTurma = async (req, res) => {
    const codigoTurma = req.params.codigo;
     try{
        const turmaCadastrada = await Turmas.findAll({where: {codigo: codigoTurma}}); // criando uma variavel que pega os parametros da rota
        
        if ( turmaCadastrada) {
            
        console.log('aqui', turmaCadastrada)
        delete req.body.codigo; // deixar impossível alterar o código da turma como medida de segurança
        const [numRowsUpdate] = await Turmas.update(req.body, { // criando uma variavel array que 
            where: {codigo: codigoTurma}
        });

        if (numRowsUpdate > 0) {
            const turmaAtualizada = await Turmas.findOne({ where: { codigo: codigoTurma}})
            return res.send({ message: 'Turma atualizada com sucesso', turmacomdadosnovos: turmaAtualizada})
        } else {
            return res.send ('Turma encontrada, porém sem novos dados para atualizar')
        }
    } else {
        console.log('Turma não encontrada')
    }
    } catch (err){
        console.log('se liga no erro ', err)
        return res.status(500).send('Ocorreu erros aqui')
    }
}
