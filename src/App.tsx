import Calculator from './components/Calculator'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  )
}

export default App
