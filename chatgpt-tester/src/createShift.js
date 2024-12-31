import { OpenAI } from 'openai'
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI(process.env.OPENAI_API_KEY)

/**
 * Function to create a thread.
 *
 * @returns {object} - The response from the openAI model.
 */
export async function createThread () {
  const thread = await client.beta.threads.create()
  console.log(thread)
  return thread
}

/**
 * Create a message in a thread.
 *
 * @param {string} threadId - The ID of the thread.
 * @param {string} content - The content of the message.
 * @returns {object} - The response from the openAI model.
 */
export async function createMessage (threadId, content) {
  const message = await client.beta.threads.messages.create(threadId, {
    role: 'user',
    content
  })
  console.log(message)
  return message
}

/**
 * Create a run in a thread.
 *
 * @param {string} threadId - The ID of the thread.
 * @param {string} assistantId - The ID of the assistant.
 * @returns {object} - The response from the openAI model.
 */
export async function createRun (threadId, assistantId) {
  const run = await client.beta.threads.runs.create(threadId, {
    assistant_id: assistantId
  })
  console.log(run)
  return run
}

/**
 * Retrieve a run in a thread.
 *
 * @param {string} threadId - The ID of the thread.
 * @param {string} runId - The ID of the run.
 * @returns {object} - The response from the openAI model.
 */
export async function retrieveRun (threadId, runId) {
  const run = await client.beta.threads.runs.retrieve(threadId, runId)
  console.log(run)
  return run
}

/**
 * Retrieve a run in a thread.
 *
 * @param {string} threadId - The ID of the thread.
 * @returns {object} - The response from the openAI model.
 */
export async function listMessages (threadId) {
  const messages = await client.beta.threads.messages.list(threadId)
  console.log(messages)

  for (const message of messages.body.data) {
    console.log('MESSAGE_______')
    console.log(message)
    console.log(message.content)
    console.log(message.content[0].text.annotations)
    console.log('VALUE:')
    console.log(message.content[0].text.value)
    if (message.role === 'assistant') {
      let jsonString = message.content[0].text.value
      jsonString = jsonString.replace(/'/g, '"')
      jsonString = jsonString.trim()
      console.log('JSON STRING:')
      console.log(jsonString)
      try {
        const newObject = JSON.parse(jsonString)
        console.log('PARSED OBJECT:')
        console.log(newObject)
        return newObject
      } catch (e) {
        console.log('ERROR:')
        console.log(e)
      }
    }
    console.log('_________')
    console.log(message.content.annotations)
  }

  return messages
}
