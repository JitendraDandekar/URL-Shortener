import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

export const createShortUrl = async (req, res) => {
    const { originalUrl, customAlias } = req.body || {};
    if (!originalUrl) return res.status(400).json({ message: 'originalUrl is required' });

    try {
        let shortCode = customAlias || nanoid(7);

        // If customAlias exists
        if (customAlias) {
            const exists = await Url.findOne({ shortCode });
            if (exists) return res.status(400).json({ message: 'customAlias already in use' });
        } else {
            // ensure uniqueness for generated id
            while (await Url.findOne({ shortCode })) {
                shortCode = nanoid(7);
            }
        }

        const url = new Url({ longUrl: originalUrl, shortCode });
        await url.save();

        res.json({ originalUrl: url.longUrl, shortUrl: url.shortUrl, shortCode: url.shortCode, isActive: url.isActive, clicks: url.clicks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const redirect = async (req, res) => {
    const { shortCode } = req.params;
    try {
        const url = await Url.findOne({ shortCode });
        if (!url) return res.status(404).json({ message: 'Not found' });

        res.redirect(url.longUrl);

        Url.updateOne({ _id: url._id }, { $inc: { clicks: 1 } }).catch(console.error);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getInfo = async (req, res) => {
    const { shortCode } = req.body;
    try {
        const url = await Url.findOne({ shortCode });
        if (!url) return res.status(404).json({ message: 'Not found' });
        res.json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getUrls = async (req, res) => {
    try {
        const url = await Url.find().sort({ createdAt: -1 });
        if (!url) return res.status(404).json({ message: 'Not found' });
        res.json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const urlStats = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const result = await Url.aggregate([
            {
                $facet: {
                    overallStats: [
                        {
                            $group: {
                                _id: null,
                                totalUrls: { $sum: 1 },
                                totalClicks: { $sum: "$clicks" }
                            }
                        }
                    ],

                    todayStats: [
                        {
                            $match: { updatedAt: { $gte: start, $lte: end } }
                        },
                        {
                            $group: {
                                _id: null,
                                totalClicks: { $sum: "$clicks" }
                            }
                        }
                    ],

                    todayCreatedUrls: [
                        {
                            $match: { createdAt: { $gte: start, $lte: end } }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 }
                            }
                        }
                    ]
                }
            }
        ]);

        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}