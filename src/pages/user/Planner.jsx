import { useMemo, useState } from 'react'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import plan from '../../data/studyPlan.json'

export default function Planner() {
  const initial = useMemo(() => ({}), [])
  const [completed, setCompleted] = useState(initial) // key: `${week}-${idx}` => boolean

  const toggle = (week, idx) => {
    const key = `${week}-${idx}`
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="grid gap-4">
      {plan.weeks.map(w => {
        const total = w.sessions.length
        const done = w.sessions.reduce((acc, _s, i) => acc + (completed[`${w.week}-${i}`] ? 1 : 0), 0)
        const pct = total ? Math.round((done / total) * 100) : 0
        return (
          <Card key={w.week} title={`Week ${w.week}`} subtitle={`${w.hours} hrs planned`} actions={<Button>Save</Button>}>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-700">Completion</span>
                <div className="flex-1"><ProgressBar value={pct} /></div>
                <span className="text-gray-600">{done}/{total}</span>
              </div>
              {w.sessions.map((s, i) => {
                const key = `${w.week}-${i}`
                const isDone = !!completed[key]
                return (
                  <div key={i} className={`flex items-center justify-between rounded-md border p-3 ${isDone ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex items-center gap-3">
                      <button
                        className={`h-5 w-5 rounded border flex items-center justify-center ${isDone ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}
                        aria-pressed={isDone}
                        aria-label="Mark session complete"
                        onClick={() => toggle(w.week, i)}
                      >
                        {isDone && <span className="h-3 w-3 bg-white rounded-sm"></span>}
                      </button>
                      <div>
                        <div className="text-sm font-medium">{s.topic}</div>
                        <div className="text-xs text-gray-500">Time block: {s.duration} hrs</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600" htmlFor={`hours-${w.week}-${i}`}>Hours</label>
                      <input id={`hours-${w.week}-${i}`} type="number" min="0" className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm" defaultValue={s.duration} aria-label="Hours per topic" />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
