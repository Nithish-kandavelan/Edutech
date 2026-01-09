import { useParams } from 'react-router-dom'
import Tabs from '../../components/common/Tabs.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import courses from '../../data/courses.json'
import plan from '../../data/studyPlan.json'

export default function Course() {
  const { courseId } = useParams()
  const course = courses.courses.find(c => c.id === courseId) || courses.courses[0]
  const syllabus = (
    <div className="grid gap-2">
      {course.syllabus.map((s, i) => (
        <div key={i} className="p-3 border rounded-md">
          <div className="font-medium">{s.topic}</div>
          <div className="text-xs text-gray-500">{s.outcomes}</div>
        </div>
      ))}
    </div>
  )
  const studyPlan = (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm">Weekly AI-generated study plan</div>
        <Button aria-label="Trigger RAG retrieval" onClick={() => {}} className="bg-gray-900 hover:bg-gray-800">Retrieve Snippets (RAG)</Button>
      </div>
      {plan.weeks.map(w => (
        <Card key={w.week} title={`Week ${w.week}`} subtitle={`${w.hours} hrs planned`}>
          <div className="grid gap-2">
            {w.sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="text-sm">{s.topic}</div>
                <div className="text-xs text-gray-500">{s.duration} hrs</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
  const materials = (
    <div className="grid gap-3">
      {course.materials.map((m, i) => (
        <Card key={i} title={m.title} subtitle={m.type}>
          <div className="text-sm text-gray-700">{m.description}</div>
          <div className="mt-2 text-xs text-gray-500">Sources visible for citation</div>
        </Card>
      ))}
    </div>
  )
  const practice = (
    <div className="grid gap-4">
      <Card title="Quiz" subtitle="Multiple-choice practice">
        <div className="grid gap-3">
          <div className="text-sm">Immediate feedback on selection</div>
          <div className="grid gap-2">
            <button className="text-left p-3 border rounded-md hover:bg-gray-50">Option A</button>
            <button className="text-left p-3 border rounded-md hover:bg-gray-50">Option B</button>
            <button className="text-left p-3 border rounded-md hover:bg-gray-50">Option C</button>
          </div>
          <div className="text-xs text-gray-500">Score summary and mastery indicator</div>
        </div>
      </Card>
    </div>
  )
  const progress = (
    <div className="grid gap-4">
      {course.topics.map((t, i) => (
        <Card key={i} title={t.name}>
          <ProgressBar value={t.mastery} />
        </Card>
      ))}
    </div>
  )
  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      {syllabus}
      <Tabs
        tabs={[
          { label: 'Study Plan', content: studyPlan },
          { label: 'Learning Materials', content: materials },
          { label: 'Practice & Quizzes', content: practice },
          { label: 'Progress Tracking', content: progress }
        ]}
      />
    </div>
  )
}
