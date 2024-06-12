// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import NavigationLayout from 'src/layouts/NavigationLayout/NavigationLayout'
import NotFoundPage from 'src/pages/NotFoundPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={NavigationLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/openai" page={OpenAiPage} name="openAi" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/?offset={offset:Int}" page={HomePage} name="homeOffset" />
        <Route path="/{pokemon:String}" page={HomePage} name="homePokemon" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
