const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        maxlength: [50, 'Product name must be less than or equal to 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function(value) {
                return value > 0; 
            },
            message: 'Price must be a positive number'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['electronics', 'clothing', 'books', 'homeappliances'],
            message: 'Category must be one of: electronics, clothing, books, homeappliances'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock must be equal to or greater than 0'], 
        validate: {
            validator: Number.isInteger, 
            message: 'Stock must be an integer'
        }
    },
    SKU: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        match: [/^PROD-[a-zA-Z0-9]{4}$/, 'SKU must follow the pattern PROD-XXXX, where X is an alphanumeric character']
    },
    tags: {
        type: [String],
        validate: [
            {
                validator: function(tags) {
                    return tags.every(tag => tag && /[!@#$%^&*(),.?":{}|<>]/.test(tag));
                },
                message: 'Each tag must contain at least one special character and be non-empty'
            },
            {
                validator: function(tags) {
                    const uniqueTags = new Set(tags);
                    return uniqueTags.size === tags.length;
                },
                message: 'Tags must not contain duplicate values'
            }
        ],
        default: [] 
    }
}, { versionKey: false });

const ProductModel = mongoose.model('product', productSchema);

module.exports= ProductModel
