const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const quotesSchema = mongoose.Schema(
  {
    quoteser: {
      type: String,
      required: true
    },

    quotes: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
quotesSchema.plugin(toJSON);
quotesSchema.plugin(paginate);

const Quotes = mongoose.model('Quotes', quotesSchema);

module.exports = Quotes;
