import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).integer().required(),
    perPage: Joi.number().min(5).max(20).default(10).integer().required(),
    tag: Joi.string()
      .min(1)
      .valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

const baseNote = {
  title: Joi.string().min(1),
  content: Joi.string().empty(''),
  tag: Joi.string()
    .valid(...TAGS)
    .empty(''),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    ...baseNote,
    title: baseNote.title.required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object(baseNote).min(1),
};
