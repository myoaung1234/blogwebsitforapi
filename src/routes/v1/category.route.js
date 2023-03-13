const express = require('express');
const auth = require('../../middlewares/auth');
const { categoryController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');


const router = express.Router();


router
  .route('/')
  .post(auth('createCategory'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get( auth('getCategory'), validate(categoryValidation.getCategories), categoryController.getCategories)

router
  .route('/:categoryId')
  .get(auth('getCategory'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('manageCategory'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth('manageCategory'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory)

router
  .route('/public/webCategories')
  .get(categoryController.getCategories)


module.exports = router;
