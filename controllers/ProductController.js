const db = require('../db');

const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM produtos';
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
}

const getProductById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar o produto.', details: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Produto não encontrado.' });
        } else {
            res.status(200).json(row);
        }
    });
};


const getProductsByRestaurant = (req, res) => {
    const { restaurantId } = req.params;
    db.all('SELECT * FROM produtos WHERE restaurante_id = ?', [restaurantId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar os produtos.', details: err.message });
        } else if (!rows) {
            res.status(404).json({ error: 'Produtos não encontrados.' });
        } else {
            res.status(200).json({ products: rows });
        }
    });
}

const createProduct = (req, res) => {
    const { restaurante_id,
            nome,
            preco,
            categoria,
            promocao,
            precoPromocional,
            diasSemanaPromocao,
            horarioInicioPromocao,
             horarioFimPromocao } = req.body;
    const query = 'INSERT INTO produtos (restaurante_id, nome, preco, categoria, promocao, precoPromocional, diasSemanaPromocao, horarioInicioPromocao, horarioFimPromocao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [restaurante_id, nome, preco, categoria, promocao, precoPromocional, diasSemanaPromocao, horarioInicioPromocao, horarioFimPromocao];
    db.run(query, values, function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao inserir o produto.', details: err.message });
        } else {
            res.status(201).json({ message: 'Produto criado com sucesso.', id: this.lastID });
        }
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria, promocao, precoPromocional, diasSemanaPromocao, horarioInicioPromocao, horarioFimPromocao } = req.body;
    const query = 'UPDATE produtos SET nome = ?, preco = ?, categoria = ?, promocao = ?, precoPromocional = ?, diasSemanaPromocao = ?, horarioInicioPromocao = ?, horarioFimPromocao = ? WHERE id = ?';
    const values = [nome, preco, categoria, promocao, precoPromocional, diasSemanaPromocao, horarioInicioPromocao, horarioFimPromocao, id];
    db.run(query, values, function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao atualizar o produto.', details: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Produto não encontrado.' });
        } else {
            res.status(200).json({ message: 'Produto atualizado com sucesso.' });
        }
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar o produto.', details: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Produto não encontrado.' });
        } else {
            res.status(200).json({ message: 'Produto deletado com sucesso.' });
        }
    });
}

module.exports =   { getAllProducts, getProductById, getProductsByRestaurant, createProduct, updateProduct, deleteProduct };    