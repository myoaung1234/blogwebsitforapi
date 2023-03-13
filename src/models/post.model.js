const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
