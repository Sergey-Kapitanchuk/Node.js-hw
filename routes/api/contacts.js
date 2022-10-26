const express = require('express');

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers")

const { validateBody, isValidId, validFavoriteBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', authenticate, isValidId, validFavoriteBody(schemas.updateStatusSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router;
