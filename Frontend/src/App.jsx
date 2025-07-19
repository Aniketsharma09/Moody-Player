import FacialExpression from "./components/FacialExpression"
import { useState } from 'react'

import MoodSongs from './components/MoodSongs'
import Nav from './components/Nav.jsx';
function App() {
  const [ Songs, setSongs ] = useState([ ]);

  return (
    <>
      <Nav/>
      <FacialExpression setSongs = {setSongs} />
      <MoodSongs songs = {Songs} />
    </>
  )
}

export default App
