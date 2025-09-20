const Joi = require("joi");

// Listing schema for validating listing data
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    image: Joi.object({
      filename: Joi.string().allow(""),
      url: Joi.string().uri().allow("").required(),
    }).required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

// Review schema for validating review data
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
