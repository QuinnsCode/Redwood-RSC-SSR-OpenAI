import {
  CopilotBackend,
  OpenAIAdapter,
  OpenAIAssistantAdapter,
} from '@copilotkit/backend'
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

// export const handler = async (event: APIGatewayEvent, _context: Context) => {
//   logger.info(`${event.httpMethod} ${event.path}: openai function`)

//   // const copilotKit = new CopilotBackend()
//   // return copilotKit.response(context, new OpenAIAdapter())
//   // const copilotKit = new CopilotBackend()
//   // const openaiAdapter = new OpenAIAdapter()
//   // copilotKit.streamHttpServerResponse(request, response, openaiAdapter)

//   try {
//     // Logging
//     console.log(`${req.method} ${req.url}: openai function`)

//     // Instantiate CopilotBackend and OpenAIAdapter
//     const copilotKit = new CopilotBackend()
//     const openaiAdapter = new OpenAIAdapter()

//     // Process the request
//     const response = await copilotKit.response(req, openaiAdapter)

//     // Return the response
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(response))
//   } catch (err) {
//     // Handle errors
//     console.error(err)
//     res.writeHead(500, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify({ error: 'Internal Server Error' }))
//   }

//   // return {
//   //   statusCode: 200,
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({
//   //     data: event.body,
//   //   }),
//   // }
// }

// export const handler = async (event) => {
//   try {
//     // Logging
//     console.log(`${event.httpMethod} ${event.path}: openai function`)
//     console.log(event.body)

//     // Instantiate CopilotBackend and OpenAIAdapter
//     const copilotKit = new CopilotBackend()
//     const response = await copilotKit.response(event, new OpenAIAdapter())

//     // Return the response
//     return {
//       statusCode: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(response),
//     }
//   } catch (err) {
//     // Handle errors
//     console.error(err)
//     return {
//       statusCode: 500,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ error: err.message }),
//     }
//   }
// }

export const handler = async (event) => {
  try {
    // Logging
    console.log(`${event.httpMethod} ${event.path}: openai function`)
    console.log(event.body)

    // Instantiate CopilotBackend and OpenAIAdapter
    const copilotKit = new CopilotBackend()
    const response = await copilotKit.response(
      event,
      new OpenAIAssistantAdapter({ assistantId: 'SwankyBot' })
    )

    // Return the response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    }
  } catch (err) {
    // Handle errors
    console.error(err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
