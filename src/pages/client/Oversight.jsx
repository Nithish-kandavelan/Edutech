import Card from '../../components/common/Card.jsx'
import Table from '../../components/common/Table.jsx'
import courses from '../../data/courses.json'

export default function Oversight() {
  const rows = courses.courses.map(c => ({ course: `${c.code} — ${c.title}`, progress: `${c.progress}%`, students: Math.floor(Math.random() * 60) + 40 }))
  return (
    <div className="grid gap-4">
      <Card title="Course Progress Summaries">
        <Table
          columns={[
            { header: 'Course', accessor: 'course' },
            { header: 'Avg. Progress', accessor: 'progress' },
            { header: 'Enrolled Students', accessor: 'students' }
          ]}
          data={rows}
        />
      </Card>
      <Card title="Student Engagement Metrics" subtitle="Placeholder charts">
        <div className="text-sm text-gray-600">Session counts, study durations, and attendance rates appear here as charts.</div>
      </Card>
    </div>
  )
}
