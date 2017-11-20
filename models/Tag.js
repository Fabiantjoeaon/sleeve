const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const Tag = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true
    },
    color: {
        type: String
    }
});

Tag.statics.getPossibleColors = () => [
    '#31AFD4',
    '#902D41',
    '#EBBAB9',
    '#97B1A6',
    '#77ACA2',
    '#E0A458',
    '#C04ABC'
];

module.exports = mongoose.model('Tag', Tag);
