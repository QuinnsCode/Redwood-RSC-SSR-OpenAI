'use client'

import { useState, useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'

const PokeDataDisplay = ({ pokemon, json, offset, limit }) => {
  const [searchPokemonNameValue, setSearchPokemonNameValue] = useState('')
  const [pokeJson, setPokeJson] = useState(json)

  console.log({ pokeJson }, { json })

  function displayJSON(jsonObj, indent = 0) {
    // Initialize an empty array to hold JSX elements
    const elements = []

    // Iterate over each key-value pair in the object
    for (const key in jsonObj) {
      // Get the current value
      const value = jsonObj[key]

      // Indent the output based on the depth of the object
      const indentation = '~'.repeat(indent)

      // Handle the case where the value is null
      if (value === null) {
        elements.push(
          <div key={`${key}-${indentation}`}>
            {indentation}
            {key}: null
          </div>
        )
        continue
      }

      // If the value is an object, recursively call the function
      if (typeof value === 'object' && !Array.isArray(value)) {
        elements.push(
          <div key={`${key}-${indentation}`}>
            {indentation}
            {key}:
          </div>
        )
        elements.push(displayJSON(value, indent + 2)) // Increase the indentation for nested objects
      } else if (Array.isArray(value)) {
        // If the value is an array, iterate over its elements
        elements.push(
          <div key={`${key}-${indentation}`}>
            {indentation}
            {key}: [
          </div>
        )
        for (const item of value) {
          elements.push(displayJSON(item, indent + 4)) // Increase the indentation for nested arrays
        }
        elements.push(
          <div key={`${key}-${indentation}-end`}>{indentation}]</div>
        )
      } else {
        // Otherwise, display the key-value pair
        elements.push(
          <div key={`${key}-${indentation}`}>
            {indentation}
            {key}: {value}
          </div>
        )
      }
    }

    // Return the array of JSX elements
    return elements
  }

  //if we are on an offset of 500 we are displaying 501-1000 so there are only 1302 so next offset is 302 not 500

  const parsedLimit = parseInt(limit, 10)
  const parsedOffset = parseInt(offset, 10)

  const validNextCount =
    parsedLimit + parsedLimit + parsedOffset > json.count
      ? json.count - parsedOffset - parsedLimit
      : parsedLimit

  //this works, but useEffect did not!
  if (JSON.stringify(json) !== JSON.stringify(pokeJson)) setPokeJson(json)

  useEffect(() => {
    console.log('try to setPokeJson on page load in useEffect not working')
    setPokeJson(JSON.parse(JSON.stringify(json)))
  }, [])

  useEffect(() => {
    if (searchPokemonNameValue) {
      const newResults = json?.results?.filter((val) => {
        return val?.name?.includes(searchPokemonNameValue)
      })
      setPokeJson({ ...json, results: newResults })
    } else {
      setPokeJson(json)
    }
  }, [searchPokemonNameValue])

  return (
    <div style={{ border: '3px blue dashed', margin: '1em', padding: '1em' }}>
      <h2>{'PokeDataDisplay'}</h2>
      <h3>This is a client component. We need to have interactive buttons</h3>
      <h4>
        Buttons will work but their onClick events are DOM based and thus cannot
        be used in server components
      </h4>
      {JSON.stringify(json) === JSON.stringify(pokeJson) ? (
        <button
          style={{ color: 'green' }}
          onClick={() => {
            setPokeJson(json)
          }}
        >
          Click to setPokeJson useState
        </button>
      ) : (
        <button
          style={{ color: 'red' }}
          onClick={() => {
            setPokeJson(json)
          }}
        >
          Click to setPokeJson useState
        </button>
      )}

      {/* If we don't have a pokemon we have the list of many pokemon */}
      {!pokemon ? (
        <div>
          <div>Total pokemon: {json.count}</div>
          {json.previous ? (
            <button
              onClick={() => {
                if (typeof offset !== 'string') {
                  const newOffset = offset + limit
                  navigate(routes.homeOffset({ offset: newOffset }), {
                    replace: true,
                  })
                } else {
                  const newOffset = parseInt(offset, 10) - limit
                  console.log({ newOffset })
                  navigate(routes.homeOffset({ offset: newOffset }), {
                    replace: true,
                  })
                }
              }}
            >
              Previous {limit}
            </button>
          ) : null}
          {json.next ? (
            <button
              onClick={() => {
                if (typeof offset !== 'string') {
                  const newOffset = offset + limit
                  navigate(routes.homeOffset({ offset: newOffset }), {
                    replace: true,
                  })
                } else {
                  const newOffset = parseInt(offset, 10) + limit
                  navigate(routes.homeOffset({ offset: newOffset }))
                }
              }}
            >
              Next {validNextCount}
            </button>
          ) : null}

          {offset != 0 ? (
            <button
              onClick={() => {
                navigate(routes.homeOffset({ offset: 0 }), { replace: true })
              }}
            >
              Back to PokeList
            </button>
          ) : null}
          <input
            placeholder=" Search for a pokemon name here "
            onChange={(e) => {
              setSearchPokemonNameValue(e.target.value)
            }}
          />
          {pokeJson.results.map((poke, index) => {
            return (
              <div key={poke.name}>
                {index + 1 + parseInt(offset) + ' - '}
                <button
                  onClick={() => {
                    navigate(routes.homePokemon({ pokemon: poke.name }))
                  }}
                >
                  {poke.name}
                </button>
              </div>
            )
          })}

          {json?.results?.length === 0
            ? 'No pokemon of that name found :('
            : null}
        </div>
      ) : null}

      {/* If we have a pokemon then we have poke data to display instead of the list */}
      {pokemon ? (
        <div>
          <div>{`Pokemon: ${pokemon}`}</div>
          <div>
            <button
              onClick={() => {
                navigate(routes.home())
              }}
            >
              Back to PokeList
            </button>
          </div>
          <div>{displayJSON(json)}</div>
        </div>
      ) : null}
    </div>
  )
}

export default PokeDataDisplay
