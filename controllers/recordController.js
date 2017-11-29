const Record = require('../models/Record');
const validate = require('validate.js');
const createUrl = require('../helpers/createUrl');

const createUrlThisResource = req =>
    `${req.protocol}://${req.get('host')}/records`;

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const index = async (req, res) => {
    const { start, limit } = req.query;

    const records = await Record.find()
        .skip(parseInt(start, 10))
        .limit(parseInt(limit, 10))
        .sort({ name: 'asc' });
    const recordCount = await Record.count();

    if (limit > recordCount)
        return res.status(400).json({ error: 'Limit is out of range' });

    const totalPages = Math.ceil(recordCount / limit);
    const currentPage = Math.ceil((start - 1) / records.length + 1);
    const lastPagePosition = recordCount - records.length;

    if (start > lastPagePosition)
        return res.status(400).json({ error: 'Start is out of range' });

    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

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
            currentItems: records.length,
            totalItems: recordCount,
            totalPages,
            currentPage,
            _links: {
                first: {
                    page: 1,
                    href: `${createUrlThisResource(req)}/?limit=${
                        limit
                    }&start=1`
                },
                last: {
                    page: totalPages,
                    href: `${createUrlThisResource(req)}/?limit=${
                        limit
                    }&start=${lastPagePosition + 1}`
                },
                previous: {
                    page: previousPage,
                    href: `${createUrlThisResource(req)}/?limit=${
                        limit
                    }&start=${
                        previousPage === 1 ? 1 : previousPage * records.length
                    }`
                },
                next: {
                    page: currentPage + 1,
                    href: `${createUrlThisResource(req)}/?limit=${
                        limit
                    }&start=${currentPage + 1 * records.length}`
                }
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
                href: createUrlThisResource(req)
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
