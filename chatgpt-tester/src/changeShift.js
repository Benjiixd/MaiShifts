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
 * @param {string} threadId the ID of the thread.
 * @param {string} content the content of the message.
 * @returns {object} the response from the openAI model.
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
 * @param {string} threadId the ID of the thread.
 * @param {string} assistantId the ID of the assistant.
 * @returns {object} the response from the openAI model.
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
 * @param {string} threadId the ID of the thread.
 * @param {string} runId the ID of the run.
 * @returns {object} the response from the openAI model.
 */
export async function retrieveRun (threadId, runId) {
  const run = await client.beta.threads.runs.retrieve(threadId, runId)
  console.log(run)
  return run
}

/**
 * List messages in a thread.
 *
 * @param {string} threadId the ID of the thread.
 * @returns {object} the response from the openAI model.
 */
export async function listMessages (threadId) {
  const messages = await client.beta.threads.messages.list(threadId)
  console.log(messages)
  messages.body.data.forEach((message) => {
    console.log('MESSAGE_______')
    console.log(message.content)
    console.log(message.content[0].text.annotations)
    console.log(message.content.anotations)
  })
  return messages
}
