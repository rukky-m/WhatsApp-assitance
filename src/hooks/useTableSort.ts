import { useState, useCallback } from 'react'

interface SortState {
  key: string
  direction: 'asc' | 'desc'
}

export function useTableSort(
  initialKey = '',
  initialDirection: 'asc' | 'desc' = 'asc'
) {
  const [sort, setSort] = useState<SortState>({
    key: initialKey,
    direction: initialDirection,
  })

  const handleSort = useCallback((key: string) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  const sortData = useCallback(
    <T>(data: T[]): T[] => {
      if (!sort.key) return data
      return [...data].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sort.key]
        const bVal = (b as Record<string, unknown>)[sort.key]
        if (aVal === bVal) return 0
        const cmp = String(aVal) < String(bVal) ? -1 : 1
        return sort.direction === 'asc' ? cmp : -cmp
      })
    },
    [sort]
  )

  return { sort, handleSort, sortData }
}
