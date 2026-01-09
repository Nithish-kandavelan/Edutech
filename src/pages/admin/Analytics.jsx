import Card from '../../components/common/Card.jsx'
import ChartPlaceholder from '../../components/common/ChartPlaceholder.jsx'

export default function Analytics() {
  return (
    <div className="grid gap-4">
      <Card title="Filters">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label>Date Range
            <select className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Semester to date</option>
            </select>
          </label>
          <label>Course
            <select className="ml-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option>All</option>
              <option>CS101</option>
              <option>MATH201</option>
              <option>PHY101</option>
            </select>
          </label>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Student Mastery Trends" subtitle="Placeholder for charts from analytics service">
          <ChartPlaceholder label="Mastery Trends" />
        </Card>
        <Card title="Quiz Performance Overview" subtitle="AI insights placeholder">
          <ChartPlaceholder label="Quiz Performance" />
        </Card>
        <Card title="Engagement Metrics" subtitle="Study time, sessions">
          <ChartPlaceholder label="Engagement" />
        </Card>
      </div>
    </div>
  )
}
