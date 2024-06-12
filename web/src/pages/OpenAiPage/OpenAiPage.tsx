// import { Link, routes } from '@redwoodjs/router'
// import { Metadata } from '@redwoodjs/web'

// import OpenAiClient from 'src/components/OpenAiClient/OpenAiClient'
import { Suspense } from 'react'

import OpenAiTest from 'src/components/OpenAiTest/OpenAiTest'
const OpenAiPage = () => {
  //
  const promptStringTest = 'what do we do when we are slow at work?'
  //

  return (
    <div className="open-ai-page">
      <div>
        {promptStringTest}
        {`: \n\n\n`}
      </div>
      <Suspense fallback={<div>{`Loading AI...`}</div>}>
        <OpenAiTest promptString={promptStringTest} />
      </Suspense>
    </div>
  )
}

export default OpenAiPage
