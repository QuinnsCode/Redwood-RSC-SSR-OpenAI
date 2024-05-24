import './NavigationLayout.css'

import { CopilotKit } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'

import '@copilotkit/react-ui/styles.css'
import { Link, routes } from '@redwoodjs/router'

type NavigationLayoutProps = {
  children?: React.ReactNode
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  return (
    <div className="navigation-layout">
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
          <li>
            <Link to={routes.openAi()}>OpenAi</Link>
          </li>
        </ul>
      </nav>
      <main>
        <CopilotKit url="/api/openai">
          <CopilotSidebar
            labels={{
              title: 'Your Assistant',
              initial: 'Hi! 👋 How can I assist you today?',
            }}
          >
            {children}
          </CopilotSidebar>
        </CopilotKit>
      </main>
    </div>
  )
}

export default NavigationLayout
