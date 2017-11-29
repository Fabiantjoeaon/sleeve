const Record = require('../models/Record');
const validate = require('validate.js');
const createUrl = require('../helpers/createUrl');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const index = async (req, res) => {
    const records = await Record.find()
        .skip(parseInt(req.query.start, 10))
        .limit(parseInt(req.query.limit, 10))
        .sort({ name: 'asc' });

    return res.status(200).json({
        items: records.map(r => ({
            ...r.toObject(),
            _links: {
                self: {
                    href: createUrl(req, r._id)
                },
                collection: {
                    href: createUrl(req)
                }
            }
        })),
        links: {
            self: {
                href: createUrl(req)
            }
        },
        pagination: {
            start: req.query.start,
            limit: req.query.limit
        }
    });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const create = async (req, res) => {
    const record = await new Record(req.body).save();
    return res.status(200).json(record);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const show = async (req, res) => {
    const record = await Record.findOne({ _id: req.params.id });
    return res.status(200).json({
        ...record.toObject(),
        _links: {
            self: {
                href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${
                    record._id
                }`
            },
            collection: {
                href: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            }
        }
    });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const edit = async (req, res) => {
    const record = await Record.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidator: true
        }
    ).exec();

    return res.status(200).json(record);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const destroy = async (req, res) => {
    const record = await Record.findOneAndRemove({ _id: req.params.id });
    return res.status(200).json(record);
};

module.exports = {
    index,
    create,
    show,
    edit,
    destroy
};
