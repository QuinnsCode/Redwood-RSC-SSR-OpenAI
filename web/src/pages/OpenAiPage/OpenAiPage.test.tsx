import { render } from '@redwoodjs/testing/web'

import OpenAiPage from './OpenAiPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OpenAiPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OpenAiPage />)
    }).not.toThrow()
  })
})
