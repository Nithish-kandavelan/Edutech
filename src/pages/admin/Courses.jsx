import { useState } from 'react'
import Card from '../../components/common/Card.jsx'
import Table from '../../components/common/Table.jsx'
import coursesData from '../../data/courses.json'

export default function Courses() {
  const [courses, setCourses] = useState(coursesData.courses)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')

  const addCourse = e => {
    e.preventDefault()
    if (!title || !code) return
    setCourses(prev => [...prev, { id: code.toLowerCase(), code, title, progress: 0, syllabus: [], materials: [], topics: [] }])
    setTitle('')
    setCode('')
  }

  return (
    <div className="grid gap-4">
      <Card title="Create / Edit Course" subtitle="Syllabus and materials are UI placeholders">
        <form onSubmit={addCourse} className="grid sm:grid-cols-3 gap-3">
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Course Title" value={title} onChange={e => setTitle(e.target.value)} aria-label="Course Title" />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} aria-label="Course Code" />
          <button className="rounded-md bg-brand-600 text-white px-4 py-2 text-sm">Create Course</button>
        </form>
        <div className="mt-3 text-xs text-gray-500">Assign learning materials and upload syllabus via placeholders.</div>
      </Card>
      <Card title="Courses">
        <Table
          columns={[
            { header: 'Code', accessor: 'code' },
            { header: 'Title', accessor: 'title' },
            { header: 'Actions', accessor: 'actions' }
          ]}
          data={courses.map(c => ({
            code: c.code,
            title: c.title,
            actions: (
              <div className="flex gap-2 text-xs">
                <button className="px-2 py-1 rounded bg-gray-100">Edit</button>
                <button className="px-2 py-1 rounded bg-gray-100">Upload Syllabus</button>
                <button className="px-2 py-1 rounded bg-gray-100">Assign Materials</button>
              </div>
            )
          }))}
        />
      </Card>
    </div>
  )
}
