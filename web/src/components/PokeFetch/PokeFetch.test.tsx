import { render } from '@redwoodjs/testing/web'

import PokeFetch from './PokeFetch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PokeFetch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PokeFetch />)
    }).not.toThrow()
  })
})
