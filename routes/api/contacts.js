const express = require('express');
const Joi = require('joi');

const models = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(/\+?[0-9\s\-/(/)]+/, "numbers").required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await models.listContacts()
    res.json(result)
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await models.getContactById(contactId);
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const result = await models.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await models.removeContact(contactId);
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json({
      message: "contact deleted"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await models.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

module.exports = router
