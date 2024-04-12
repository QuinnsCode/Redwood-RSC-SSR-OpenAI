import { Suspense } from 'react'

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

  return (
    <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
      <h2>{'PokeFetch'}</h2>
      <h3>This is a server component.</h3>
      <p>
        <Suspense fallback={<div>LOOOOOOOOADING</div>}>
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
  )
}

export default PokeFetch
