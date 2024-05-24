import { defineEntries } from '@redwoodjs/vite/entries'

export default defineEntries(
  // getEntry
  async (id: string) => {
    switch (id) {
      case 'AboutPage':
        return import('./pages/AboutPage/AboutPage')
      case 'HomePage':
        return import('./pages/HomePage/HomePage')
      case 'OpenAiPage':
        return import('./pages/OpenAiPage/OpenAiPage')
      default:
        return null
    }
  }
)
