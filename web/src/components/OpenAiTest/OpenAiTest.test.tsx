import { render } from '@redwoodjs/testing/web'

import OpenAiTest from './OpenAiTest'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OpenAiTest', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpenAiTest />)
    }).not.toThrow()
  })
})
