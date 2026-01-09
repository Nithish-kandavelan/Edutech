export default function Card({ title, subtitle, actions, children }) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          {title && <div className="text-sm font-semibold">{title}</div>}
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
        {actions}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
