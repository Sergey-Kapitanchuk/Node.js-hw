const express = require('express');

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers")

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router()


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
