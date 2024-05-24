import { render } from '@redwoodjs/testing/web'

import OpenAiClient from './OpenAiClient'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OpenAiClient', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpenAiClient />)
    }).not.toThrow()
  })
})
