const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService, categoryService } = require('../services');


const createPost = catchAsync(async (req, res) => {
  let formData = req.body
  formData.desc = req.EditorJsBody
  formData.userId = req.user._id
  const post = await postService.createPost(formData);
  await categoryService.updateNumberOfPosts(formData.category)
  res.status(httpStatus.CREATED).send(post);
});

const getPosts= catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'category']);
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'category, userId'
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found !!');
  }
  const update = await postService.updatePostById(req.params.postId, {viewCount: post.viewCount + 1});
  res.send(update);
});

const updatePost = catchAsync(async (req, res) => {
  let data = req.body
  data.desc = req.EditorJsBody
  const post = await postService.updatePostById(req.params.postId, data);
  await categoryService.updateNumberOfPosts(req.body.category)
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found !!');
  }
  await postService.deletePostById(req.params.postId);
  await categoryService.updateNumberOfPosts(post.category)
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
 };
