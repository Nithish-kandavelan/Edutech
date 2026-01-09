export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, value))
  const snap = Math.round(pct / 5) * 5
  const widthClass = `w-p${snap}`
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div className={`h-2 bg-brand-600 rounded-full ${widthClass}`}></div>
    </div>
  )
}
