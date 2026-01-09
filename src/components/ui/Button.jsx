export default function Button({ as = 'button', className = '', children, ...props }) {
  const Comp = as
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md bg-brand-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
