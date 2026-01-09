export default function StatCard({ label, value, hint }) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
    </div>
  )
}
