import { useMemo, useState } from 'react'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import ProgressBar from '../../components/common/ProgressBar.jsx'
import quiz from '../../data/quiz_cs101.json'

export default function Quiz() {
  const questions = useMemo(() => quiz.questions, [])
  const [answers, setAnswers] = useState({}) // { [qid]: optionIndex }
  const [submitted, setSubmitted] = useState(false)

  const select = (qid, idx) => {
    setAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  const { correctCount, percent } = useMemo(() => {
    const total = questions.length
    let correct = 0
    for (const q of questions) {
      const sel = answers[q.id]
      if (typeof sel === 'number' && q.options[sel]?.correct) correct++
    }
    const pct = total ? Math.round((correct / total) * 100) : 0
    return { correctCount: correct, percent: pct }
  }, [answers, questions])

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="grid gap-4">
      <Card title="Practice Quiz" subtitle="Immediate feedback with summary and retry">
        <div className="grid gap-4">
          {questions.map((q) => {
            const sel = answers[q.id]
            return (
              <div key={q.id} className="border rounded-md p-3">
                <div className="text-sm font-medium">{q.prompt}</div>
                <div className="mt-2 grid gap-2" role="group" aria-label={q.prompt}>
                  {q.options.map((opt, i) => {
                    const chosen = sel === i
                    const isCorrect = opt.correct
                    const showImmediate = typeof sel === 'number' && chosen
                    const base = 'text-left p-3 border rounded-md focus:outline-none focus:ring-2'
                    const state = chosen
                      ? (isCorrect ? 'bg-green-50 border-green-300 ring-green-200' : 'bg-rose-50 border-rose-300 ring-rose-200')
                      : 'hover:bg-gray-50'
                    return (
                      <button
                        key={i}
                        className={`${base} ${state}`}
                        onClick={() => select(q.id, i)}
                        aria-pressed={chosen}
                      >
                        {opt.text}
                      </button>
                    )
                  })}
                </div>
                {typeof sel === 'number' && (
                  <div className={`mt-2 text-xs ${q.options[sel].correct ? 'text-green-700' : 'text-rose-700'}`}>
                    {q.options[sel].correct ? 'Correct' : 'Incorrect — try another option or submit to see your summary.'}
                  </div>
                )}
              </div>
            )
          })}
          <div className="flex items-center gap-3">
            {!submitted && (
              <Button onClick={() => setSubmitted(true)}>Finish Quiz</Button>
            )}
            {submitted && (
              <>
                <Button onClick={retry}>Retry</Button>
                <div className="text-sm text-gray-700">Score: {correctCount} / {questions.length} ({percent}%)</div>
              </>
            )}
          </div>
          {submitted && (
            <div className="grid gap-2">
              <div className="text-sm font-medium">Mastery Indicator</div>
              <ProgressBar value={percent} />
              <div className="text-xs text-gray-500">This indicator is illustrative; mastery updates are UI-only.</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
