/**
 * @file Defines the ShiftController class.
 * @module ShiftController
 * @author Mats Loock
 */

import { ShiftModel } from '../models/ShiftModel.js'

/**
 * Encapsulates a controller.
 */
export class ShiftController {
  /**
   * Creates a new shift.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - redirect to the index page.
   */
  async createPost (req, res) {
    console.log('ShiftController.create was called')

    try {
      const { name, muscleGroups, exercises, owner, explanation } = req.body

      console.log(`Received data: ${JSON.stringify(req.body)}`)

      // Ensure muscleGroups and exercises are arrays of strings
      const muscleGroupsArray = Array.isArray(muscleGroups) ? muscleGroups : JSON.parse(muscleGroups)
      const exercisesArray = Array.isArray(exercises) ? exercises : JSON.parse(exercises)

      const newShift = new ShiftModel({
        name,
        muscleGroups: muscleGroupsArray,
        exercises: exercisesArray,
        explanation,
        owner
      })

      await newShift.save()

      console.log(`New shift created: ${JSON.stringify(newShift)}`)

      res.status(201).json(newShift)
    } catch (error) {
      console.error(`Error creating shift: ${error}`)

      res.status(500).json({ error: 'An error occurred while creating the shift.' })
    }
  }

  /**
   * Updates a specific shift.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async updatePost (req, res) {
    const id = req.body.id
    const newExercises = req.body.newExercises
    const newExplanation = req.body.newExplanation
    console.log(newExercises)
    const shift = await ShiftModel.findById(id)
    console.log(`shift: ${JSON.stringify(shift)}`)
    console.log(shift)
    const updated = await ShiftModel.updateOne({ _id: id }, { $set: { exercises: newExercises, explanation: newExplanation } })
    console.log(updated)
    res.send(shift)
  }

  /**
   * Function to delete one exercise from a shift.
   *
   * @param {Promise<object>} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deleteExercise (req, res) {
    const id = req.body.id
    const exerciseToDelete = req.body.exerciseName
    console.log(exerciseToDelete)
    const shift = await ShiftModel.findById(id)
    console.log(`shift: ${JSON.stringify(shift)}`)
    console.log(shift)
    const updated = await ShiftModel.updateOne({ _id: id }, { $pull: { exercises: exerciseToDelete } })
    res.send(updated)
  }

  /**
   * Deletes the specified shift.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - redirect to the index page.
   */
  async deletePost (req, res) {
    const id = req.body.id
    console.log('Delete post was called')
    await ShiftModel.deleteOne({ _id: id })
    res.status(200).json({ id })
  }

  /**
   * Retrieves shifts for a specific user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - Shifts data sent in the response.
   */
  async get (req, res) {
    console.log('ShiftController.get was called')
    const userJson = req.query.user
    console.log(`user: ${userJson}`)
    const shifts = await ShiftModel.find({ owner: userJson })
    console.log(`shifts: ${JSON.stringify(shifts)}`)
    console.log(`shifts: ${shifts}`)
    res.send(shifts)
  }
}
