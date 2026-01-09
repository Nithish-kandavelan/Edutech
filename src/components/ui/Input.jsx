export default function Input({ label, id, type = 'text', className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <input id={id} type={type} className={`rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:ring-brand-300 ${className}`} {...props} />
    </div>
  )
}
