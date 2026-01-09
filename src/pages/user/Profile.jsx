import Card from '../../components/common/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../routes/AuthContext.jsx'
import { useState } from 'react'

export default function Profile() {
  const { user } = useAuth()
  const [hours, setHours] = useState(6)
  const [deadline, setDeadline] = useState('2026-03-31')
  const [prefCourse, setPrefCourse] = useState('CS101')

  return (
    <div className="grid gap-4">
      <Card title="Student Profile" subtitle="Academic details">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input id="name" label="Full Name" defaultValue={user?.name || 'Member'} readOnly />
          <Input id="email" label="Email" defaultValue={user?.email || ''} readOnly />
          <Input id="role" label="Role" defaultValue={user?.role} readOnly />
        </div>
      </Card>
      <Card title="Course Preferences">
        <div className="grid sm:grid-cols-2 gap-4">
          <Select id="preferredCourse" label="Preferred Course" value={prefCourse} onChange={e => setPrefCourse(e.target.value)}>
            <option>CS101</option>
            <option>MATH201</option>
            <option>PHY101</option>
          </Select>
          <Input id="hours" label="Available Hours per Week" type="number" value={hours} onChange={e => setHours(e.target.value)} />
          <Input id="deadline" label="Upcoming Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <Button className="mt-4">Save Preferences</Button>
      </Card>
      <Card title="Study Constraints">
        <div className="text-sm text-gray-600">Schedule constraints and accommodations can be noted here for planning. This is a UI-only placeholder.</div>
      </Card>
    </div>
  )
}
