export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.accessor} scope="col" className="px-4 py-2 text-left font-semibold text-gray-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col.accessor} className="px-4 py-2">{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
