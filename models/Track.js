const mongoose = require('mongoose');
const validate = require('validate.js');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const Record = new Schema(
    {
        side: {
            type: String
        },
        name: {
            type: String
        },
        record: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Record'
        },
        notes: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

module.exports = mongoose.model('Track', Track);
