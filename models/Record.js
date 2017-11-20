const mongoose = require('mongoose');
const validate = require('validate.js');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const Record = new Schema(
    {
        name: {
            type: String
        },
        cover: {
            type: String
        },
        artist: {
            type: String
        },
        description: {
            type: String
        },
        tracks: [
            {
                text: String,
                trackList: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Track'
                }
            }
        ],
        tag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

module.exports = mongoose.model('Record', Record);
