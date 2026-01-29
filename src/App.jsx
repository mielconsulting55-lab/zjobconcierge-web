import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ZJobConcierge from './pages/ZJobConcierge'
import JobConciergeUnifiedFlow from './pages/JobConciergeUnifiedFlow'
import Dashboard from './pages/Dashboard'
import TryDemoElite from './pages/TryDemoElite'
import PricingV4 from './pages/PricingV4'
import JobConciergeCheckoutFlow from './pages/JobConciergeCheckoutFlow'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZJobConcierge />} />
        <Route path="/get-started" element={<JobConciergeUnifiedFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/try-demo" element={<TryDemoElite />} />
        <Route path="/pricing" element={<PricingV4 />} />
        <Route path="/checkout" element={<JobConciergeCheckoutFlow />} />
      </Routes>
    </Router>
  )
}

export default App
