import type { Meta, StoryObj } from '@storybook/react'

import OpenAiPage from './OpenAiPage'

const meta: Meta<typeof OpenAiPage> = {
  component: OpenAiPage,
}

export default meta

type Story = StoryObj<typeof OpenAiPage>

export const Primary: Story = {}
