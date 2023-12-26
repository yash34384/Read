const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Book name required"],
    trim: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  author: {
    type: String
  },
  price: {
    type: Number,
    required: [true, "Book price required"]
  },
  description: {
    type: String,
    required: [true, "Book description required"]
  },
  type: {
    type: String,
    required: [true, "Mention type such as notes, novel, Course book"],
    lowercase: true
  },
  stock: {
    type: Number,
    required: [true, "Enter the amount of Book stock"],
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);