// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import OpenAiTest from './OpenAiTest'

const meta: Meta<typeof OpenAiTest> = {
  component: OpenAiTest,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OpenAiTest>

export const Primary: Story = {}
