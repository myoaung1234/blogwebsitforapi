const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    image: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    category: Joi.string().required(),
    summary: Joi.string(),
    userId: Joi.string()
  }),
};

const getPosts = {
  query: Joi.object().keys({
    image: Joi.string(),
    title: Joi.string(),
    desc: Joi.string(),
    category: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
    sortBy: Joi.string()
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      image : Joi.string(),
      title: Joi.string(),
      desc: Joi.string(),
      category: Joi.string(),
      viewCount: Joi.number(),
      summary: Joi.string(),
      userId: Joi.string(),
      id: Joi.string()
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
