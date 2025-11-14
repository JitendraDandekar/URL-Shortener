import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
    {
        longUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            unique: true,
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // only relevant if you have user accounts
            default: null,
        },
    },
    {
        timestamps: true, // auto-creates createdAt & updatedAt
    }
);

// Hash password before saving
urlSchema.pre('save', async function (next) {
    if (!this.isModified('shortCode')) return next();

    this.shortUrl = `${process.env.HOST || "http://localhost"}:${process.env.PORT || 5000}/${this.shortCode}`;
    next();
});

export default mongoose.model('Url', urlSchema);
