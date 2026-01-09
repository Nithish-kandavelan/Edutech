import Card from '../../components/common/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../routes/AuthContext.jsx'

export default function ClientProfile() {
  const { user } = useAuth()
  return (
    <div className="grid gap-4">
      <Card title="Institution Profile">
        <div className="grid sm:grid-cols-2 gap-3">
          <Input id="institution" label="Institution Name" defaultValue={user?.institution || 'Partner University'} />
          <Input id="contact" label="Contact Email" defaultValue={user?.email || 'contact@institution.edu'} />
          <Input id="phone" label="Phone" defaultValue={'+91 00000 00000'} />
          <Input id="address" label="Address" defaultValue={'Academic Road, City'} />
        </div>
        <Button className="mt-4">Save</Button>
      </Card>
      <Card title="Subscription Status" subtitle="UI-only">
        <div className="text-sm text-gray-700">Plan: Institutional Standard • Seats: 200 • Renewal: 2026-08-01</div>
      </Card>
    </div>
  )
}
