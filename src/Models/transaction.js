const { model, Schema } = require('mongoose');
const schema_jsonSchema = require('mongoose-schema-jsonschema/lib/schema');

const SchemaTransaction = new Schema({
    account_id: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    operation: {
        type: Number,
        require: true,
    },
    movement: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
})

module.exports = model('transaction', SchemaTransaction);