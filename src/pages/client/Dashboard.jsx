import StatCard from '../../components/common/StatCard.jsx'
import Card from '../../components/common/Card.jsx'
import ChartPlaceholder from '../../components/common/ChartPlaceholder.jsx'
import { useAuth } from '../../routes/AuthContext.jsx'
import courses from '../../data/courses.json'

export default function ClientDashboard() {
  const { user } = useAuth()
  const institution = user?.institution || 'Partner University'
  const enrolled = 120
  const activeCourses = courses.courses.length
  return (
    <div className="grid gap-6">
      <Card title="Institution Overview" subtitle={institution}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Enrolled Students" value={enrolled} />
          <StatCard label="Active Courses" value={activeCourses} />
          <StatCard label="Avg. Course Progress" value="62%" />
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Engagement Summary">
          <ChartPlaceholder label="Engagement" />
        </Card>
        <Card title="Mastery Overview">
          <ChartPlaceholder label="Mastery" />
        </Card>
      </div>
    </div>
  )
}
