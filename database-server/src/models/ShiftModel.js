/**
 * @file Defines the Shift model.
 * @module ShiftModel
 * @author Benjamin Karlsson
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  muscleGroups: {
    type: [String],
    required: true,
    trim: true,
    minlength: 1
  },
  exercises: {
    type: [String],
    required: true,
    trim: true,
    minlength: 1
  },
  explanation: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  owner: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const ShiftModel = mongoose.models.Shifts || mongoose.model('Shifts', schema)
