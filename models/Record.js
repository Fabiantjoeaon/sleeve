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
            required: 'You must supply an artist'
        },
        description: {
            type: String,
            required: 'You must supply an description'
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

Record.pre('find', function() {
    console.log('thush', this);
    this._links = {
        self: '',
        collection: ''
    };
});

module.exports = mongoose.model('Record', Record);
