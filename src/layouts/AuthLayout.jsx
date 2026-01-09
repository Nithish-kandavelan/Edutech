import { Link } from 'react-router-dom'

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded bg-brand-600"></div>
          <div>
            <div className="font-semibold">Personalized Learning Copilot</div>
            <div className="text-xs text-gray-500">for Core Courses</div>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">{title}</h1>
        {children}
        <div className="mt-6 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-700">Return to start</Link>
        </div>
      </div>
    </div>
  )
}
