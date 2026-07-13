import * as React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { Badge } from './Badge'

// --- Types ---
export interface TableColumn<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  width?: string
  className?: string
  headerClassName?: string
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

export interface TableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  selectable?: boolean
  selectedRows?: Set<string | number>
  onSelectionChange?: (selected: Set<string | number>) => void
  bulkActions?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (ids: (string | number)[]) => void
    variant?: 'default' | 'destructive'
  }>
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string) => void
  emptyMessage?: string
  className?: string
  stickyHeader?: boolean
}

// --- Spinner placeholder ---
const TableSkeleton: React.FC<{ cols: number }> = ({ cols }) => (
  <>
    {Array.from({ length: 5 }).map((_, rowIdx) => (
      <tr key={rowIdx}>
        {Array.from({ length: cols }).map((_, colIdx) => (
          <td key={colIdx} className="px-4 py-3">
            <div className="h-4 rounded bg-muted animate-pulse" />
          </td>
        ))}
      </tr>
    ))}
  </>
)

// --- Table Component ---
function Table<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  selectable = false,
  selectedRows,
  onSelectionChange,
  bulkActions,
  sortKey,
  sortDirection,
  onSort,
  emptyMessage = 'No data found.',
  className,
  stickyHeader = false,
}: TableProps<T>) {
  const allSelected =
    data.length > 0 && data.every((row) => selectedRows?.has(row.id))
  const someSelected =
    !allSelected && data.some((row) => selectedRows?.has(row.id))

  const toggleAll = () => {
    if (!onSelectionChange) return
    if (allSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(data.map((r) => r.id)))
    }
  }

  const toggleRow = (id: string | number) => {
    if (!onSelectionChange || !selectedRows) return
    const next = new Set(selectedRows)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    onSelectionChange(next)
  }

  const selectedCount = selectedRows?.size ?? 0

  return (
    <div className={cn('w-full', className)}>
      {/* Bulk actions bar */}
      {selectable && selectedCount > 0 && bulkActions && (
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 border border-border rounded-t-lg -mb-px">
          <Badge variant="secondary">{selectedCount} selected</Badge>
          <div className="flex items-center gap-2 ml-auto">
            {bulkActions.map((action, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={
                  action.variant === 'destructive' ? 'destructive' : 'outline'
                }
                onClick={() => action.onClick(Array.from(selectedRows ?? []))}
              >
                {action.icon && <span className="mr-1.5">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead
            className={cn(
              'bg-muted/50 border-b border-border',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected
                    }}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap',
                    col.headerClassName,
                    col.width && `w-[${col.width}]`
                  )}
                >
                  {col.sortable && onSort ? (
                    <button
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
                      onClick={() => onSort(String(col.key))}
                    >
                      {col.header}
                      {sortKey === String(col.key) ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-70" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {loading ? (
              <TableSkeleton cols={columns.length + (selectable ? 1 : 0)} />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-muted/30 transition-colors',
                    selectedRows?.has(row.id) && 'bg-primary/5'
                  )}
                >
                  {selectable && (
                    <td className="w-10 px-4 py-3">
                      <Checkbox
                        checked={selectedRows?.has(row.id) ?? false}
                        onChange={() => toggleRow(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn('px-4 py-3 text-foreground', col.className)}
                    >
                      {col.render
                        ? col.render(
                            (row as Record<string, unknown>)[String(col.key)],
                            row,
                            rowIdx
                          )
                        : String(
                            (row as Record<string, unknown>)[String(col.key)] ??
                              ''
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { Table }
