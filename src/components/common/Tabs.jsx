import { useState } from 'react'

export default function Tabs({ tabs }) {
  const [current, setCurrent] = useState(0)
  return (
    <div>
      <div className="flex gap-2 border-b">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={`px-3 py-2 text-sm rounded-t-md ${i === current ? 'bg-white border border-b-0 border-gray-200' : 'hover:bg-gray-100 text-gray-600'}`}
            onClick={() => setCurrent(i)}
            aria-selected={i === current}
            role="tab"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="border border-gray-200 rounded-b-md p-4">
        {tabs[current]?.content}
      </div>
    </div>
  )
}
