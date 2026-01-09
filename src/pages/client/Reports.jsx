import Card from '../../components/common/Card.jsx'
import Table from '../../components/common/Table.jsx'
import Button from '../../components/ui/Button.jsx'

export default function Reports() {
  const data = [
    { report: 'CS101 Mid-Sem Performance', period: 'Weeks 1-6', generated: '2026-01-03' },
    { report: 'MATH201 Engagement Summary', period: 'Weeks 1-6', generated: '2026-01-04' }
  ]
  return (
    <div className="grid gap-4">
      <Card title="Reports" subtitle="Download is a UI-only placeholder" actions={<Button className="bg-gray-900 hover:bg-gray-800">Download Report</Button>}>
        <Table columns={[{ header: 'Report', accessor: 'report' }, { header: 'Period', accessor: 'period' }, { header: 'Generated On', accessor: 'generated' }]} data={data} />
      </Card>
      <Card title="Report Visualizations">
        <div className="w-full h-48 grid place-items-center bg-brand-50 text-brand-700 rounded-lg text-sm">Charts Placeholder</div>
      </Card>
    </div>
  )
}
