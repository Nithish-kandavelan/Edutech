import { useMemo, useState } from 'react'
import Card from '../../components/common/Card.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import Button from '../../components/ui/Button.jsx'
import courses from '../../data/courses.json'
import progress from '../../data/progress_cs101.json'

export default function Progress() {
  const topics = courses.courses[0].topics
  const timeline = progress.timeline
  const overall = progress.overallProgress
  const [notes, setNotes] = useState(progress.reflections)
  const [newNote, setNewNote] = useState('')

  const addNote = e => {
    e.preventDefault()
    if (!newNote.trim()) return
    const today = new Date().toISOString().slice(0, 10)
    setNotes(prev => [{ date: today, note: newNote.trim() }, ...prev])
    setNewNote('')
  }

  const avgTopicMastery = useMemo(() => {
    if (!topics.length) return 0
    const sum = topics.reduce((acc, t) => acc + (t.mastery || 0), 0)
    return Math.round(sum / topics.length)
  }, [topics])

  return (
    <div className="grid gap-6">
      <Card title="Overall Course Completion" subtitle="Illustrative progress">
        <div className="grid gap-2">
          <ProgressBar value={overall} />
          <div className="text-sm text-gray-700">Overall: {overall}% • Topic mastery avg: {avgTopicMastery}%</div>
        </div>
      </Card>

      <Card title="Topic-Level Mastery">
        <div className="grid gap-3">
          {topics.map((t, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="text-gray-600">{t.mastery}%</div>
              </div>
              <ProgressBar value={t.mastery} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Historical Performance Timeline" subtitle="Weekly scores (illustrative)">
        <div className="grid gap-3">
          {timeline.map((pt, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-sm">
                <div>{pt.label}</div>
                <div className="text-gray-600">{pt.score}%</div>
              </div>
              <ProgressBar value={pt.score} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Reflection Notes" subtitle="Short academic reflections to guide improvement">
        <form onSubmit={addNote} className="grid gap-3">
          <textarea
            className="min-h-20 rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Add a brief reflection (e.g., topics to revisit, time allocation changes)"
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            aria-label="Reflection note"
          />
          <Button type="submit">Save Note</Button>
        </form>
        <div className="mt-4 grid gap-3">
          {notes.map((n, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="text-xs text-gray-500">{n.date}</div>
              <div className="text-sm text-gray-800 mt-1">{n.note}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
