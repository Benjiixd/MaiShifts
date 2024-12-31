/**
 * @file Defines the shift router.
 * @module shiftRouter
 * @author Mats Loock
 */
// src/routes/ShiftRouter.js
import express from 'express'
import { ShiftController } from '../controllers/ShiftController.js'

export const router = express.Router()

const controller = new ShiftController()

router.get('/', (req, res, next) => controller.get(req, res, next))

router.post('/create', (req, res, next) => controller.createPost(req, res, next))

router.post('/update', (req, res, next) => controller.updatePost(req, res, next))

router.post('/delete', (req, res, next) => controller.deletePost(req, res, next))

router.post('/deleteExercise', (req, res, next) => controller.deleteExercise(req, res, next))
