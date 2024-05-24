import { Suspense } from 'react'

import OpenAiTest from '../OpenAiTest/OpenAiTest'
import PokeDataDisplay from '../PokeDataDisplay/PokeDataDisplay'
const PokeFetch = async ({ pokemon, offset, limit }) => {
  //if we have a pokemon name get that info
  //otherwise use offset and limit to grab a "limit" amount at a time offset by offset
  const url = pokemon
    ? `https://pokeapi.co/api/v2/pokemon/${pokemon?.toLowerCase()}`
    : `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await data.json()

  const promptStringTest =
    'You are Professor Oak, the famed Pokemon researcher. I need you to tell me about the pokemon '

  return (
    <>
      <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
        <h2>{'PokeFetch server component'}</h2>
        <hr />
        <p>
          <div
            style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}
          >
            <h3>{'Pokedex AI (OpenAI)'}</h3>
            {pokemon && (
              <Suspense fallback={<div>{`Loading Pokedex...`}</div>}>
                <OpenAiTest promptString={promptStringTest + pokemon} />
              </Suspense>
            )}
          </div>
        </p>
        <p>
          <Suspense fallback={<div>PokeFetch component loading... </div>}>
            <PokeDataDisplay
              pokemon={pokemon}
              offset={offset}
              limit={limit}
              json={json}
              key={json}
            />
          </Suspense>
        </p>
      </div>
    </>
  )
}

export default PokeFetch
