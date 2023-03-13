const express = require('express');
const { postController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate  = require('../../middlewares/validate');
const { postValidation } = require('../../validations');


const router = express.Router();


router
  .route('/')
  .post(auth('createPost'), validate(postValidation.createPost), postController.createPost)
  .get(auth('getPosts'), validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .get(auth('getPost'),validate(postValidation.getPost), postController.getPost)
  .patch(auth('managePosts'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth('managePosts'),validate(postValidation.deletePost), postController.deletePost)

router
  .route('/public/webPosts')
  .get(postController.getPosts)

router
  .route('/public/single/:postId')
  .get(postController.getPost)


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management and retrieval
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a post
 *     description: Only admins can create other posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -image
 *               - title
 *               - desc
 *               - category
 *               -viewCount
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               category:
 *                  type: string
 *             example:
 *               image: fake.jpg
 *               title: fake title
 *               desc: fake desc
 *               category: fake category
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/bad require'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all posts
 *     description: Only admins can retrieve all posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Post title
 *       - in: query
 *         name: desc
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 page:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post
 *     description: Logged in users can fetch only their own post information.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a post
 *     description: Logged in users can only update their own information. Only admins can update other posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               category:
 *                 type: string
 *             example:
 *               image: fake.jpg
 *               title: fake title
 *               desc: fake desc
 *               category: fake category
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a post
 *     description: Logged in users can delete only themselves. Only admins can delete other posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         post: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
