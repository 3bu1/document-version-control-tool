const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const objectValidation = require('../../validations/object.validation');
const objectController = require('../../controllers/object.controller');

const router = express.Router();

router.route('/').post(auth('manageObjects'), validate(objectValidation.createObject), objectController.createObject);

router.route('/:key').get(auth('getObjects'), validate(objectValidation.getObjects), objectController.getObjects);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Objects
 *   description: Object management and retrieval
 */

/**
 * @swagger
 * path:
 *  /objects:
 *    post:
 *      summary: Create a object
 *      description: Only admins can create other objects.
 *      tags: [Objects]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Object'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /objects/{key}:
 *    get:
 *      summary: Get a object
 *      description: Logged in objects can fetch only their own object information. Only admins can fetch other objects.
 *      tags: [Objects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: key
 *          required: true
 *          schema:
 *            type: string
 *          description: Object key
 *        - in: query
 *          name: timestamp
 *          schema:
 *            type: string
 *          description: unix time
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Object'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */
