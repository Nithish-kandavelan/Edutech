import Button from '../../components/ui/Button.jsx'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="grid gap-8">
      <section className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold">Personalized Learning Copilot for Core Courses</h2>
          <p className="text-gray-600">AI-driven study planning, knowledge retrieval, and mastery tracking for rigorous academic progress.</p>
          <div className="flex gap-3">
            <Button as={Link} to="/user/dashboard">Get Started</Button>
            <Button as={Link} to="/user/course/cs101" className="bg-gray-900 hover:bg-gray-800">View Demo</Button>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow-card border border-gray-100 p-8">
        <div className="text-sm text-gray-600">Reserved branding area for partner institutions</div>
      </section>
    </div>
  )
}
