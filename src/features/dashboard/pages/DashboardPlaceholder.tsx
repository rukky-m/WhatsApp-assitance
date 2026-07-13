interface DashboardPlaceholderProps {
  title: string
  description: string
  phaseLabel: string
}

export const DashboardPlaceholder = ({
  title,
  description,
  phaseLabel,
}: DashboardPlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-foreground">
          Module setup in progress
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          This section is planned for {phaseLabel}.
        </p>
      </div>
    </div>
  )
}
