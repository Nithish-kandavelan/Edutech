import StatCard from '../../components/common/StatCard.jsx'
import Card from '../../components/common/Card.jsx'
import ChartPlaceholder from '../../components/common/ChartPlaceholder.jsx'
import courses from '../../data/courses.json'

export default function AdminDashboard() {
  const totalCourses = courses.courses.length
  const totalUsers = 420
  const activeInstitutions = 8
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total users" value={totalUsers} />
        <StatCard label="Total courses" value={totalCourses} />
        <StatCard label="Active institutions" value={activeInstitutions} />
        <StatCard label="Monthly usage" value="12,430" hint="dummy analytics" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Usage Overview" subtitle="Academic-style analytics">
          <ChartPlaceholder label="Usage Overview" />
        </Card>
        <Card title="Course Activity" subtitle="Placeholder for AI insights">
          <ChartPlaceholder label="Course Activity" />
        </Card>
      </div>
    </div>
  )
}
