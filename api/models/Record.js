const mongoose = require('mongoose');
const validate = require('validate.js');

const { Schema } = mongoose;

const Record = new Schema({
    name: {
        type: String,
        minLength: 2,
        required: 'You must supply a name'
    },
    artist: {
        type: String,
        minLength: 2,
        required: 'You must supply an artist'
    },
    description: {
        type: String,
        minLength: 2,
        required: 'You must supply an description'
    }
    //     tracks: [
    //         {
    //             type: String,
    //             required: 'You must supply a name for a track',
    //             trackList: [
    //                 {
    //                     side: {
    //                         type: String,
    //                         required: 'You must supply a side for a track'
    //                     },
    //                     name: {
    //                         type: String,
    //                         required: 'You must supply a side for a track'
    //                     }
    //                 }
    //             ]
    //         }
    //     ],
    //     genre: {
    //         type: String
    //     }
    // },
    // {
    //     timestamps: {
    //         createdAt: 'createdAt',
    //         updatedAt: 'updatedAt'
    //     }
});

const ensureNotEmpty = val => !val.length === 0 || val.trim();
Record.path('name').validate(
    ensureNotEmpty,
    'Name must be longer than 2 characters'
);
Record.path('description').validate(
    ensureNotEmpty,
    'Description must be longer than 2 characters'
);
Record.path('artist').validate(
    ensureNotEmpty,
    'Artist must be longer than 2 characters'
);

module.exports = mongoose.model('Record', Record);
