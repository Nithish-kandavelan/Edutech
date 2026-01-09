import { useMemo, useState } from 'react'
import Card from '../../components/common/Card.jsx'
import Table from '../../components/common/Table.jsx'

const baseUsers = [
  { name: 'Ananya Rao', email: 'ananya.rao@uni.edu', role: 'user', course: 'CS101', active: true },
  { name: 'Rahul Mehta', email: 'rahul.mehta@uni.edu', role: 'user', course: 'MATH201', active: true },
  { name: 'Priya Iyer', email: 'priya.iyer@college.edu', role: 'client', course: '-', active: true },
  { name: 'Systems Admin', email: 'admin@platform.edu', role: 'admin', course: '-', active: true },
  { name: 'Neha Kapoor', email: 'neha.kapoor@uni.edu', role: 'user', course: 'PHY101', active: false }
]

export default function Users() {
  const [users, setUsers] = useState(baseUsers)
  const [role, setRole] = useState('all')
  const [course, setCourse] = useState('all')

  const filtered = useMemo(() => users.filter(u => (role === 'all' || u.role === role) && (course === 'all' || u.course === course)), [users, role, course])

  const toggleActive = email => {
    setUsers(prev => prev.map(u => u.email === email ? { ...u, active: !u.active } : u))
  }

  return (
    <div className="grid gap-4">
      <Card title="Filters">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm">Role
            <select className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm" value={role} onChange={e => setRole(e.target.value)}>
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>
          </label>
          <label className="text-sm">Course
            <select className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm" value={course} onChange={e => setCourse(e.target.value)}>
              <option value="all">All</option>
              <option value="CS101">CS101</option>
              <option value="MATH201">MATH201</option>
              <option value="PHY101">PHY101</option>
            </select>
          </label>
        </div>
      </Card>
      <Card title="Users" subtitle="Activate / deactivate is UI-only">
        <Table
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: 'role' },
            { header: 'Course', accessor: 'course' },
            { header: 'Status', accessor: 'status' }
          ]}
          data={filtered.map(u => ({
            name: u.name,
            email: u.email,
            role: u.role,
            course: u.course,
            status: (
              <button className={`px-2 py-1 rounded text-xs ${u.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`} onClick={() => toggleActive(u.email)}>
                {u.active ? 'Active' : 'Inactive'}
              </button>
            )
          }))}
        />
      </Card>
    </div>
  )
}
