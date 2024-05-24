'use client'

import { useEffect, useState, useRef } from 'react'

import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

// const UPDATE_TEXT_MUTATION = gql`
//   mutation UpdateText($text: String!) {
//     updateText(text: $text) {
//       id
//       // other fields you want to return
//     }
//   }
// `

const OpenAiClient = ({ passIn }) => {
  // const [inputs, setInputs] = useState([])
  // const [conversation, setConversation] = useState([])

  console.log({ passIn })

  const PROMPT_FIELD = 'openAiPromptString'

  const promptStringRef = useRef(null)

  return (
    <div>
      <div className="w-full m-2 border-2 border-violet-800 border-solid rounded-xl">
        <div className="w-full">
          <input
            id={PROMPT_FIELD}
            onChange={(e) => {
              promptStringRef.current = e.target.value
            }}
          />
        </div>

        <div className="w-full">
          <button
            onClick={() => {
              console.log(promptStringRef.current)
            }}
            className="rw-button rounded-2xl bg-black text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpenAiClient
