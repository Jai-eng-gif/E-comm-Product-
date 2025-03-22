const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Product',
    tableName: 'products',
    columns: {
        id: { primary: true, type: 'int', generated: true },
        sku: { type: 'varchar' },
        name: { type: 'varchar' },
        price: { type: 'decimal' },
        images: { type: 'longtext', nullable: true }, // Store image paths as JSON
    },
});