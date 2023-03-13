const express = require('express');
const { quotesController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { quotesValidation } = require('../../validations');


const router = express.Router();


router
  .route('/')
  .post(auth('createQuotess'), validate(quotesValidation.createQuotes) ,quotesController.createQuotes)
  .get(auth('getQuotess'),validate(quotesValidation.getQuotess), quotesController.getQuotess);

router
  .route('/:quotesId')
  .get(auth('getQuotes'),validate(quotesValidation.getQuotes), quotesController.getQuotes)
  .patch(auth('manageQuotes'),validate(quotesValidation.updateQuotes), quotesController.updateQuotes)
  .delete(auth('manageQuotes'),validate(quotesValidation.deleteQuotes), quotesController.deleteQuotes)

  router
  .route('/public/webQuotess')
  .get(quotesController.getQuotess);


module.exports = router;
