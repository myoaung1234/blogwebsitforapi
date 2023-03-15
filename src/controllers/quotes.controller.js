const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { quotesService } = require('../services');


const createQuotes = catchAsync(async (req, res) => {
  let formData = req.body
  const quotes = await quotesService.createQuotes(formData);
  res.status(httpStatus.CREATED).send(quotes);
});

const getQuotess= catchAsync(async (req, res) => {
  const filter = pick(req.query, ['quotes', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await quotesService.queryQuotess(filter, options);
  res.send(result);
});


const getQuotes = catchAsync(async (req, res) => {
  const quotes = await quotesService.getQuotesById(req.params.quotesId);
  if (!quotes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quotes not found !!');
  }
  res.send(quotes);
});

const updateQuotes = catchAsync(async (req, res) => {
  let data = req.body
  data.quotes = req.EditorJsBody
  const quotes = await quotesService.updateQuotesById(req.params.quotesId, data);
  res.send(quotes);
});

const deleteQuotes = catchAsync(async (req, res) => {
  await quotesService.deleteQuotesById(req.params.quotesId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createQuotes,
  getQuotess,
  getQuotes,
  updateQuotes,
  deleteQuotes
 };
