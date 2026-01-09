import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../routes/AuthContext.jsx'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [institution, setInstitution] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const onSubmit = e => {
    e.preventDefault()
    signup({ email, role, name, institution: role === 'client' ? institution : undefined })
    if (role === 'admin') navigate('/admin', { replace: true })
    else if (role === 'client') navigate('/client', { replace: true })
    else navigate('/user', { replace: true })
  }

  return (
    <AuthLayout title="Create account">
      <form onSubmit={onSubmit} className="grid gap-4" aria-label="Signup form">
        <Input id="name" label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Select id="role" label="Role" value={role} onChange={e => setRole(e.target.value)} required>
          <option value="user">User (Student)</option>
          <option value="client">Client (Institution)</option>
        </Select>
        {role === 'client' && (
          <Input id="institution" label="Institution Name" value={institution} onChange={e => setInstitution(e.target.value)} required />
        )}
        <Button type="submit">Sign up</Button>
      </form>
      <div className="mt-2 text-sm">
        <span className="text-gray-600">Already have an account?</span> <Link className="text-brand-700 hover:underline" to="/login">Sign in</Link>
      </div>
    </AuthLayout>
  )
}
