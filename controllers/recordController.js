const Record = require('../models/Record');
const validate = require('validate.js');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const index = async (req, res) => {};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const create = async (req, res) => {
    const record = await new Record(req.body).save();
    return record.message
        ? res.status(400).json(record)
        : res.status(200).json(record);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const show = async (req, res) => {
    const record = await Record.findById({ id: req._id });
    return record
        ? res.status(200).json(record)
        : res.status(404).json({ message: 'Resource could not be found' });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const edit = async (req, res) => {};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const destroy = async (req, res) => {};

module.exports = {
    index,
    create,
    show,
    edit,
    destroy
};
