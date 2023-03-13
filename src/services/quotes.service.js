const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const { Quotes } = require('../models');

/**
 * Create a user
 * @param {Object} quotesBody
 * @returns {Promise<Quotes>}
 */
const createQuotes = async (quotesBody) => {
  return Quotes.create(quotesBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuotess = async (filter, options) => {
  const quotess = await Quotes.paginate(filter, options);
  return quotess;
};



/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Quotes>}
 */
const getQuotesById = async (id) => {
  return Quotes.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} quotesId
 * @param {Object} updateBody
 * @returns {Promise<Quotes>}
 */
const updateQuotesById = async (quotesId, updateBody) => {
  const quotes = await getQuotesById(quotesId);
  if (!quotes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quotes not found');
  }

  Object.assign(quotes, updateBody);
  await quotes.save();
  return quotes;
};

/**
 * Delete post by id
 * @param {ObjectId} quotesId
 * @returns {Promise<Quotes>}
 */
const deleteQuotesById = async (quotesId) => {
  const quotes = await getQuotesById(quotesId);
  if (!quotes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quotes not found');
  }
  await quotes.remove();
  return quotes;
};


module.exports = {
  createQuotes,
  queryQuotess,
  getQuotesById,
  updateQuotesById,
  deleteQuotesById,
};
