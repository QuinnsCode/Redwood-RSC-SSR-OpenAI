import { Suspense } from 'react'

import { Counter } from 'src/components/Counter/Counter'
import PokeFetch from 'src/components/PokeFetch/PokeFetch'

// @ts-expect-error no types
import styles from './HomePage.module.css'

import './HomePage.css'

const HomePage = ({ name = 'Anonymous', pokemon, offset, limit }) => {
  // const handlePassback = (data2) => {
  //   console.log({ data2 })
  // }

  return (
    <div className="home-page">
      <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
        {/* <Counter /> */}

        {/* <h1 className={styles.title}>Hello {name}!!</h1> */}
        <h3>Home Page server component.</h3>
        <hr />
        <Suspense fallback={<div>Loading pokemons...</div>}>
          <PokeFetch
            pokemon={pokemon}
            offset={offset ? offset : 0}
            limit={limit ? limit : 500}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage
