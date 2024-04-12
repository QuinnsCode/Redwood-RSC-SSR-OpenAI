'use client'

import { useState, useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'

const PokeDataDisplay = ({ pokemon, json, offset, limit }) => {
  const POKEMON_NAME_INPUT = 'pokemon-name-input'

  const POKEMON_STORE = 'pokemon-store'

  const parsedLimit = parseInt(limit, 10)
  const parsedOffset = parseInt(offset, 10)

  const validNextCount =
    parsedLimit + parsedLimit + parsedOffset > json.count
      ? json.count - parsedOffset - parsedLimit
      : parsedLimit

  const [searchPokemonNameValue, setSearchPokemonNameValue] = useState('')
  const [pokeJson, setPokeJson] = useState(json)

  console.log('top of pokeDataDisplay component', { pokeJson }, { json })

  function concatPokemonInLocalStorage(json) {
    // if (!json) return

    if (!localStorage) return

    const pokeStore = localStorage.getItem(POKEMON_STORE)

    if (!pokeStore) {
      localStorage.setItem(POKEMON_STORE, JSON.stringify(json))
    } else {
      const was = JSON.parse(pokeStore)

      const cachedAll = was?.length === json.count

      if (cachedAll) return
      const newMap = new Map()

      was.results.forEach((poke) => {
        if (!newMap.has(poke.name)) {
          newMap.set(poke.name, poke)
        }
      })

      json?.results?.forEach((poke) => {
        if (!newMap.has(poke.name)) {
          newMap.set(poke.name, poke)
        }
      })
      const newResults = Array.from(newMap.values())
      console.log({ ...json, results: newResults })
      localStorage.setItem(
        POKEMON_STORE,
        JSON.stringify({ ...json, results: newResults })
      )
    }

    // return { ...json, results: newResults }
  }

  function resetField() {
    document.getElementById(`${POKEMON_NAME_INPUT}`).value = ''
  }

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
  //this works, but useEffect did not!

  concatPokemonInLocalStorage(json)

  if (
    JSON.stringify(json) !== JSON.stringify(pokeJson) &&
    !searchPokemonNameValue
  ) {
    setPokeJson(json)
  }

  // useEffect(() => {
  //   console.log({ pokeJson })
  // }, [pokeJson])

  // useEffect(() => {
  //   console.log('try to setPokeJson on page load in useEffect not working')
  //   if (!pokeJson) {
  //     setPokeJson(JSON.parse(JSON.stringify(json)))
  //   }
  // }, [])

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
      <h3>{'PokeDataDisplay'}</h3>
      <h4>This is a client component. We need to have interactive buttons</h4>
      <p>
        Buttons will work but their onClick events are DOM based and thus cannot
        be used in server components
      </p>
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
          {/* If there is a previous node this will have a url and if not it is null */}
          {json.previous ? (
            <button
              onClick={() => {
                setSearchPokemonNameValue('')
                if (typeof offset !== 'string') {
                  const newOffset = offset + limit
                  resetField()
                  navigate(routes.homeOffset({ offset: newOffset }))
                } else {
                  //route parameters come through as strings
                  const newOffset = parseInt(offset, 10) - limit
                  resetField()
                  navigate(routes.homeOffset({ offset: newOffset }))
                }
              }}
            >
              Previous {limit}
            </button>
          ) : null}
          {/* If there is a previous node this will have a url and if not it is null */}
          {json.next ? (
            <button
              onClick={() => {
                setSearchPokemonNameValue('')
                if (typeof offset !== 'string') {
                  const newOffset = offset + limit
                  resetField()
                  navigate(routes.homeOffset({ offset: newOffset }))
                } else {
                  const newOffset = parseInt(offset, 10) + limit
                  resetField()
                  navigate(routes.homeOffset({ offset: newOffset }))
                }
              }}
            >
              Next {validNextCount}
            </button>
          ) : null}

          {/* If offset is zero we already at the start */}
          {offset != 0 ? (
            <button
              onClick={() => {
                navigate(routes.homeOffset({ offset: 0 }))
              }}
            >
              Back to PokeList
            </button>
          ) : null}

          {/* Input to filter pokemon by name because we are returning 500 at the moment at a time */}
          {/* Why are there 1302 pokemon??????? */}
          <input
            id={POKEMON_NAME_INPUT}
            placeholder=" Search for a pokemon name here "
            onChange={(e) => {
              setSearchPokemonNameValue(e.target.value)
            }}
          />
          {/* Map over results */}
          {pokeJson && pokeJson?.results?.length > 0
            ? pokeJson.results.map((poke, index) => {
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
              })
            : null}

          {/* Show something if the user inputed pokemon name does not exist */}
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
                navigate(routes.homeOffset({ offset: 0 }))
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
