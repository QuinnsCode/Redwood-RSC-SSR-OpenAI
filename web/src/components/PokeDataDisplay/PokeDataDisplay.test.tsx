import { render } from '@redwoodjs/testing/web'

import PokeDataDisplay from './PokeDataDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PokeDataDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PokeDataDisplay />)
    }).not.toThrow()
  })
})
