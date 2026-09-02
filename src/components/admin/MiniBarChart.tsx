import type { ChartPoint } from '../../types/admin'

interface MiniBarChartProps {
  data: ChartPoint[]
  formatValue?: (n: number) => string
}

export function MiniBarChart({ data, formatValue }: MiniBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="space-y-1.5">
      {data.map((d) => {
        const label = d.day ? d.day.slice(5) : (d.name ?? '')
        return (
          <div key={`${label}-${d.value}`} className="flex items-center gap-2 text-xs">
            <span className="w-16 shrink-0 truncate text-gray-500">{label}</span>
            <div className="h-2.5 flex-1 rounded-full bg-gray-100">
              <div className="h-2.5 rounded-full bg-primary-500" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
            <span className="w-14 shrink-0 text-right text-gray-600">
              {formatValue ? formatValue(d.value) : d.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
