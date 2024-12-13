const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurante.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
    }
  });

    db.serialize(() => {
        // Tabela de Restaurantes
        db.run(`
          CREATE TABLE IF NOT EXISTS restaurantes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            endereco TEXT NOT NULL,
            foto TEXT,
            horariosFuncionamento TEXT
          )
        `, (err) => {
          if (err) {
            console.error('Erro ao criar a tabela "restaurantes":', err.message);
          } else {
            console.log('Tabela "restaurantes" pronta.');
          }
        });
  
        // Tabela de Produtos
        db.run(`
            CREATE TABLE IF NOT EXISTS produtos (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              restaurante_id INTEGER NOT NULL,
              nome TEXT NOT NULL,
              preco REAL NOT NULL,
              categoria TEXT NOT NULL,
              promocao TEXT,
              precoPromocional REAL,
              diasSemanaPromocao TEXT,
              horarioInicioPromocao TEXT,
              horarioFimPromocao TEXT,
              FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
            )
          `, (err) => {
            if (err) {
              console.error('Erro ao criar a tabela "produtos":', err.message);
            } else {
              console.log('Tabela "produtos" pronta.');
            }
          });
        });

  module.exports = db;