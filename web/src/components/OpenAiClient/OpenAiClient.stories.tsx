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

import OpenAiClient from './OpenAiClient'

const meta: Meta<typeof OpenAiClient> = {
  component: OpenAiClient,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OpenAiClient>

export const Primary: Story = {}
