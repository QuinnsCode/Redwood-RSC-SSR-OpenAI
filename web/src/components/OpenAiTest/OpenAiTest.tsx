import OpenAI from 'openai'

const openai = new OpenAI({
  organization: process.env.OPEN_AI_ORG,
  project: process.env.OPEN_AI_PROJECT,
})

const OpenAiTest = async ({ promptString }) => {
  // console.log('openaitest', content)

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: promptString }],
    model: 'gpt-3.5-turbo',
  })

  return completion?.choices[0]?.message?.content
}

export default OpenAiTest
