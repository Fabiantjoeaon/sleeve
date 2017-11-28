const mongoose = require('mongoose');
const validate = require('validate.js');

const { Schema } = mongoose;

const Record = new Schema(
    {
        name: {
            type: String,
            required: 'You must supply a name'
        },
        artist: {
            type: String,
            required: 'You must supply a name'
        },
        description: {
            type: String,
            required: 'You must supply a name'
        },
        tracks: [
            {
                type: String,
                required: 'You must supply a name for a track',
                trackList: [
                    {
                        side: {
                            type: String,
                            required: 'You must supply a side for a track'
                        },
                        name: {
                            type: String,
                            required: 'You must supply a side for a track'
                        }
                    }
                ]
            }
        ],
        genre: {
            type: String
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
