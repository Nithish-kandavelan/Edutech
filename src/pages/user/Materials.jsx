import Card from '../../components/common/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import courses from '../../data/courses.json'

export default function Materials() {
  const mats = courses.courses[0].materials
  return (
    <div className="grid gap-4">
      {mats.map((m, i) => (
        <Card key={i} title={m.title} subtitle={m.type} actions={<Button className="bg-gray-900 hover:bg-gray-800">Retrieve Snippets (RAG)</Button>}>
          <div className="text-sm text-gray-700">{m.description}</div>
          <div className="mt-3">
            <div className="w-full h-48 grid place-items-center rounded-md bg-brand-50 text-brand-700 text-sm">
              {m.type === 'PDF' && 'PDF Viewer Placeholder'}
              {m.type === 'Slides' && 'Slides Viewer Placeholder'}
              {m.type === 'Lecture Notes' && 'Notes Viewer Placeholder'}
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm font-medium">References (visible sources)</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700" aria-label="Citation sources">
              <li>CLRS — Introduction to Algorithms, 3rd Ed., Chapter on Stacks & Queues</li>
              <li>Course Slides: Week 3, Stacks and Queues, Department of Computer Science</li>
              <li>Open Data Structures (Pat Morin) — Queues section</li>
            </ul>
            <div className="mt-2 text-xs text-gray-500">Citations are illustrative and prepared for academic use.</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
