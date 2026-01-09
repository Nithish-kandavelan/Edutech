export default function Select({ label, id, className = '', children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <select id={id} className={`rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:ring-brand-300 ${className}`} {...props}>
        {children}
      </select>
    </div>
  )
}
