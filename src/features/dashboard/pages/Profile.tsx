import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfileStore } from '@/store/useProfileStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
})

type ProfileForm = z.infer<typeof profileSchema>

export function Profile() {
  const { profile, loading, setProfile, updateProfile, setLoading } = useProfileStore()

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '', avatarUrl: '' },
  })

  // Load profile on mount (mock for now)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      // Mock profile data if none
      const mock = profile ?? {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: '',
      }
      setProfile(mock)
      setValue('name', mock.name)
      setValue('email', mock.email)
      setValue('avatarUrl', mock.avatarUrl ?? '')
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data)
    // Optionally show toast here
  }

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading profile…</div>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar name={profile?.name ?? ''} size="lg" />
            {/* Avatar upload could be added here */}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="name">
                Name
              </label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="email">
                Email
              </label>
              <Input id="email" {...register('email')} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="avatarUrl">
                Avatar URL (optional)
              </label>
              <Input id="avatarUrl" {...register('avatarUrl')} />
              {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
