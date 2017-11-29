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
        _links: {
            self: {
                href: createUrl(req)
            }
        },
        pagination: {
            start: req.query.start ? req.query.start : 0,
            limit: req.query.limit ? req.query.limit : 0
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
    if (!req.body.name || !req.body.description || !req.body.artist)
        return res.status(422).json({ error: 'No input' });
    const record = await new Record(req.body).save();
    return res.status(201).json(record);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const show = async (req, res) => {
    const record = await Record.findOne({ _id: req.params.id });
    if (!record) return res.status(404).json({ error: 'Not found' });
    return res.status(201).json({
        ...record.toObject(),
        _links: {
            self: {
                href: createUrl(req)
            },
            collection: {
                href: `${req.protocol}://${req.get('host')}/records`
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
    if (!req.body.name || !req.body.description || !req.body.artist)
        return res.status(422).json({ error: 'No input' });
    const record = await Record.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            // new: true,
            runValidator: true
        }
    ).exec();
    if (!record) return res.status(404).json({ error: 'Not found' });
    return res.status(204).json(record);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const destroy = async (req, res) => {
    const record = await Record.findOneAndRemove({ _id: req.params.id });
    if (!record) return res.status(404).json({ error: 'Not found' });
    return res.status(204).json(record);
};

module.exports = {
    index,
    create,
    show,
    edit,
    destroy
};
