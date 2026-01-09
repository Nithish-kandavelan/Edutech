import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../routes/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  const onSubmit = e => {
    e.preventDefault()
    login({ email, role })
    if (role === 'admin') navigate('/admin', { replace: true })
    else if (role === 'client') navigate('/client', { replace: true })
    else navigate(from && from.startsWith('/user') ? from : '/user', { replace: true })
  }

  return (
    <AuthLayout title="Sign in">
      <form onSubmit={onSubmit} className="grid gap-4" aria-label="Login form">
        <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Select id="role" label="Role" value={role} onChange={e => setRole(e.target.value)} required>
          <option value="user">User (Student)</option>
          <option value="admin">Admin</option>
          <option value="client">Client (Institution)</option>
        </Select>
        <Button type="submit">Login</Button>
      </form>
      <div className="mt-4 text-sm">
        <Link className="text-brand-700 hover:underline" to="#">Forgot Password</Link>
      </div>
      <div className="mt-2 text-sm">
        <span className="text-gray-600">No account?</span> <Link className="text-brand-700 hover:underline" to="/signup">Create one</Link>
      </div>
    </AuthLayout>
  )
}
