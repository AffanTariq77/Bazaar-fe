import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
