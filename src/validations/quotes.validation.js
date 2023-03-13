const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createQuotes = {
  body: Joi.object().keys({
    quoteser: Joi.string().required(),
    quotes: Joi.string().required(),
  }),
};

const getQuotess = {
  query: Joi.object().keys({
    quoteser: Joi.string(),
    quotes: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),

  }),
};

const getQuotes = {
  params: Joi.object().keys({
    quotesId: Joi.string().custom(objectId),
  }),
};

const updateQuotes = {
  params: Joi.object().keys({
    quotesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      quoteser: Joi.string(),
      quotes: Joi.string(),
    })
    .min(1),
};

const deleteQuotes = {
  params: Joi.object().keys({
    quotesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuotes,
  getQuotess,
  getQuotes,
  updateQuotes,
  deleteQuotes,
};
