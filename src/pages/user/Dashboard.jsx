import StatCard from '../../components/common/StatCard.jsx'
import Card from '../../components/common/Card.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import ChartPlaceholder from '../../components/common/ChartPlaceholder.jsx'
import data from '../../data/courses.json'

export default function Dashboard() {
  const activeCourses = data.courses.slice(0, 3)
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Active Courses" value={activeCourses.length} />
        <StatCard label="Weekly Study Plan" value="6 hrs" hint="2 hrs completed" />
        <StatCard label="Mastery Progress" value="64%" />
        <StatCard label="Pending Quizzes" value="3" />
      </div>
      <Card title="Active Courses">
        <div className="grid gap-4">
          {activeCourses.map(c => (
            <div key={c.id} className="p-3 border rounded-md">
              <div className="font-medium">{c.title}</div>
              <div className="text-xs text-gray-500">{c.code}</div>
              <div className="mt-2">
                <ProgressBar value={c.progress} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Mastery Trend" subtitle="Academic-style chart">
          <ChartPlaceholder label="Mastery Trend" />
        </Card>
        <Card title="Study Time" subtitle="Hours per week">
          <ChartPlaceholder label="Study Time" />
        </Card>
      </div>
    </div>
  )
}
