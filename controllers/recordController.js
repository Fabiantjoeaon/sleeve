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
    const errors = validate(req.body, Record.getInitialConstraints());
    if (errors) res.status(400).json({ errors });

    const record = new Record(req.body);
    await record.save();

    return res.status(200).json({
        record,
        message: `Succesfullt created record ${name} by ${artist}!`
    });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const show = async (req, res) => {};

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
