const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    username: 'sql12769107',
    password: 'dIKhp54zXP',
    database: 'sql12769107',
    entities: [require('../models/Product')],
    synchronize: true, // Auto-create tables
});


AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('DB connection error:', err));

module.exports = AppDataSource;