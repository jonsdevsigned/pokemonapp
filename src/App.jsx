import { HashRouter, Routes, Route, Link} from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokemon/:id' element={<Pokemon />} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App
