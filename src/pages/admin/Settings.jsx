import Card from '../../components/common/Card.jsx'

export default function Settings() {
  return (
    <div className="grid gap-4">
      <Card title="Role Permissions" subtitle="UI-only configuration">
        <div className="grid gap-3 text-sm">
          <div className="font-medium">User (Student)</div>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Access study planner</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Attempt quizzes</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> View analytics summary</label>
          <div className="font-medium mt-4">Client (Institution)</div>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> View course oversight</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Download reports</label>
          <div className="font-medium mt-4">Admin</div>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Manage users</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Manage courses</label>
        </div>
      </Card>
      <Card title="Platform Configuration" subtitle="Placeholders for system settings">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <label>Brand color
            <input type="color" defaultValue="#5375ba" className="ml-2 h-9 w-16" />
          </label>
          <label>Session timeout (min)
            <input type="number" defaultValue={30} className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm w-24" />
          </label>
        </div>
        <button className="mt-4 rounded-md bg-brand-600 text-white px-4 py-2 text-sm">Save</button>
      </Card>
    </div>
  )
}
