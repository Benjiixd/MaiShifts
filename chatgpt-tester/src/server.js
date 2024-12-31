import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createThread, createMessage, createRun, retrieveRun, listMessages } from './createShift.js'
dotenv.config()

/**
 * The main function.
 */
async function main () {
  /**
   * Function to create a shift with openAI.
   *
   * @param { string } stringToSend - The string to send to the openAI model.
   * @returns { object } - The response from the openAI model.
   */
  async function create (stringToSend) {
    const assistantIdToUse = 'asst_7zahY73HRp1hl13RQt6rcZZ4'
    const thread = await createThread()
    // eslint-disable-next-line no-unused-vars
    const message = await createMessage(thread.id, stringToSend)
    const run = await createRun(thread.id, assistantIdToUse)
    let retrievedRun
    while (true) {
      retrievedRun = await retrieveRun(thread.id, run.id)
      if (retrievedRun.status === 'completed') {
        break
      }
    }
    const messages = await listMessages(thread.id)

    console.log('____FINAL____')
    console.log(messages)
    console.log(messages.exercises)
    console.log(messages.explanation)

    return messages
  }

  /**
   * Function to change a shift with openAI.
   *
   * @param {string} sentString - The string to send to the openAI model.
   * @returns {object} - The response from the openAI model.
   */
  async function change (sentString) {
    const assistantIdChange = 'asst_nhzff1kDkqT47wYoUDzmb96f'

    const thread = await createThread()
    // eslint-disable-next-line no-unused-vars
    const message = await createMessage(thread.id, sentString)
    const run = await createRun(thread.id, assistantIdChange)
    let retrievedRun
    while (true) {
      retrievedRun = await retrieveRun(thread.id, run.id)
      if (retrievedRun.status === 'completed') {
        break
      }
    }
    const messages = await listMessages(thread.id)

    console.log('____FINAL____')
    console.log(messages)
    console.log(messages.exercises)
    console.log(messages.explanation)

    return messages
  }

  const app = express()
  app.use(cors())
  app.use(express.json())

  // CHATGPT KEY 
  app.post('/create', async (req, res) => {
    console.log(req.body.stringToSend)
    res.send(await create(req.body.stringToSend))
  // res.send(req.body.stringToSend)
  })

  app.post('/change', async (req, res) => {
    console.log(req.body.stringToSend)
    res.send(await change(req.body.stringToSend))
  // res.send(req.body.stringToSend)
  })

  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
  })
}

main()
