import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../routes/AuthContext.jsx'

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'}`
      }
      end
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

export default function BaseDashboardLayout({ role, nav }) {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-brand-600"></div>
            <div className="text-sm">
              <div className="font-semibold">Personalized Learning Copilot</div>
              <div className="text-xs text-gray-500">for Core Courses</div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600">
              {role.toUpperCase()} • {user?.name}
            </div>
            <button onClick={logout} className="rounded-md bg-gray-900 text-white px-3 py-2 text-sm hover:bg-gray-800">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-12">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-1">
            {nav.map(item => (
              <NavItem key={item.to} to={item.to} label={item.label} icon={item.icon} />
            ))}
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
            <footer className="mt-12 border-t pt-6 text-xs text-gray-500">
              <div>Contact: academics@youruniversity.edu</div>
              <div>Academic use only. Content and analytics are illustrative.</div>
              <div className="mt-1">&copy; {new Date().getFullYear()} Learning Systems</div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
