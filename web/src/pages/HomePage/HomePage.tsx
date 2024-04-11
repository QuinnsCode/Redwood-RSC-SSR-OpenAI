import { Suspense } from 'react'

import { Counter } from 'src/components/Counter/Counter'
import PokeFetch from 'src/components/PokeFetch/PokeFetch'

// @ts-expect-error no types
import styles from './HomePage.module.css'

import './HomePage.css'

const HomePage = ({ name = 'Anonymous', pokemon, offset, limit }) => {
  return (
    <div className="home-page">
      <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
        <h1 className={styles.title}>Hello {name}!!</h1>
        <h3>This is a server component.</h3>
        {/* <Counter /> */}
        <Suspense fallback={<div>Loading...</div>}>
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
