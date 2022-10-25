const express = require('express');

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers")

const { validateBody, isValidId, validFavoriteBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', isValidId, validFavoriteBody(schemas.updateStatusSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router;
