const { encrypt, isHashMatching } = require('../helpers/hashing');
const mongoose = require('mongoose');
const validate = require('validate.js');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const User = new Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            index: { unique: true }
        },
        password: {
            type: String
        },
        avatar: {
            type: String
        },
        records: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Record'
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

User.pre('save', async function hashUser(next) {
    if (!this.isModified('password')) return next();

    const hash = await encrypt(this.password);
    this.password = hash;

    return next();
});

User.statics.getInitialConstraints = () => ({
    username: {
        presence: true,
        length: {
            minimum: 2,
            maximum: 15,
            message: 'must be between 2 and 15 characters'
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 4,
            message: 'must be at least 4 characters'
        }
    }
});

User.methods.comparePassword = async function comparePassword(
    candidatePassword
) {
    return isHashMatching(candidatePassword, this.password);
};

module.exports = mongoose.model('User', User);
