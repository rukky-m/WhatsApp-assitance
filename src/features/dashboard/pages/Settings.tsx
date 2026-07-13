import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.boolean(),
  language: z.string().min(2).max(5),
})

type SettingsForm = z.infer<typeof settingsSchema>

export function Settings() {
  const { theme, notifications, language, setTheme, setNotifications, setLanguage } =
    useSettingsStore()

  const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { theme, notifications, language },
  })

  // Sync store values to form on mount
  React.useEffect(() => {
    setValue('theme', theme)
    setValue('notifications', notifications)
    setValue('language', language)
  }, [theme, notifications, language, setValue])

  const onSubmit = (data: SettingsForm) => {
    setTheme(data.theme)
    setNotifications(data.notifications)
    setLanguage(data.language)
  }

  const watched = watch()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Theme */}
            <div className="flex items-center space-x-4">
              <label className="w-32 font-medium" htmlFor="theme">
                Theme
              </label>
              <Select
                id="theme"
                value={watched.theme}
                onValueChange={(val) => setValue('theme', val as any)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="light">Light</Select.Item>
                  <Select.Item value="dark">Dark</Select.Item>
                  <Select.Item value="system">System</Select.Item>
                </Select.Content>
              </Select>
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <label className="w-32 font-medium" htmlFor="notifications">
                Notifications
              </label>
              <Checkbox
                id="notifications"
                {...register('notifications')}
                checked={watched.notifications}
                onCheckedChange={(checked) => setValue('notifications', !!checked)}
              />
            </div>

            {/* Language */}
            <div className="flex items-center space-x-4">
              <label className="w-32 font-medium" htmlFor="language">
                Language
              </label>
              <Input id="language" {...register('language')} />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
