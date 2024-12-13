const db = require('../db');

const getAllRestaurants = (req, res) => {
    const query = 'SELECT * FROM restaurantes';
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar restaurantes.', details: err.message });
            return;
        }
        res.json({ restaurants: rows });
    });
}

const getRestaurantById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM restaurantes WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar o restaurante.', details: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Restaurante não encontrado.' });
        } else {
            res.status(200).json(row);
        }
    });
}

const createRestaurant = (req, res) => {
    const { nome, endereco, foto, horariosFuncionamento } = req.body;
    const query = 'INSERT INTO restaurantes (nome, endereco, foto, horariosFuncionamento) VALUES (?, ?, ?, ?)';
    const values = [nome, endereco, foto, horariosFuncionamento];
    db.run(query, values, function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao inserir o restaurante.', details: err.message });
        } else {
            res.status(201).json({ message: 'Restaurante criado com sucesso.', id: this.lastID });
        }
    });
}

const updateRestaurant = (req, res) => {
    const { id } = req.params;
    const { nome, endereco, foto, horariosFuncionamento } = req.body;
    const query = 'UPDATE restaurantes SET nome = ?, endereco = ?, foto = ?, horariosFuncionamento = ? WHERE id = ?';
    const values = [nome, endereco, foto, horariosFuncionamento, id];
    db.run(query, values, function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao atualizar o restaurante.', details: err.message });
        } else {
            res.status(200).json({ message: 'Restaurante atualizado com sucesso.' });
        }
    });
}

const deleteRestaurant = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM restaurantes WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar o restaurante.', details: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Restaurante não encontrado.' });
        } else {
            res.status(200).json({ message: 'Restaurante deletado com sucesso.' });
        }
    });
}

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
// Compare this snippet from controllers/restaurantController.js: