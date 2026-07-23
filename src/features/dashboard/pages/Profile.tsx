import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileStore } from '@/store/useProfileStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Table } from '@/components/ui/Table';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export function Profile() {
  const { profile, loading, setProfile, updateProfile, setLoading } = useProfileStore();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '', avatarUrl: '' },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  // Load profile on mount (mock for now)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const mock = profile ?? {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: '',
        createdAt: new Date().toLocaleDateString(),
      };
      setProfile(mock);
      setProfileValue('name', mock.name);
      setProfileValue('email', mock.email);
      setProfileValue('avatarUrl', mock.avatarUrl ?? '');
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [setLoading, setProfile, setProfileValue]);

  const onProfileSubmit = (data: ProfileForm) => {
    updateProfile(data);
    // TODO: show toast on success
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    // TODO: hit backend to change password
    console.log('Password changed', data);
    resetPasswordForm();
    // TODO: show toast on success
  };

  // Mock recent activity data
  const recentActivities = [
    { id: 1, action: 'Logged in', time: '2024-09-01 10:15 AM' },
    { id: 2, action: 'Updated profile', time: '2024-09-01 10:20 AM' },
    { id: 3, action: 'Sent a message', time: '2024-09-01 10:25 AM' },
  ];

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading profile…</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left side – avatar and read‑only info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar name={profile?.name ?? ''} size="lg" />
            <div className="text-center">
              <p className="font-medium">{profile?.name}</p>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
            <div className="w-full">
              <p className="text-sm">User ID: <span className="font-mono">{profile?.id}</span></p>
              <p className="text-sm">Created At: {profile?.createdAt}</p>
            </div>
          </CardContent>
        </Card>

        {/* Right side – editable forms */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1" htmlFor="name">Name</label>
                  <Input id="name" {...registerProfile('name')} />
                  {profileErrors.name && <p className="text-red-500 text-sm">{profileErrors.name.message}</p>}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="email">Email</label>
                  <Input id="email" {...registerProfile('email')} />
                  {profileErrors.email && <p className="text-red-500 text-sm">{profileErrors.email.message}</p>}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="avatarUrl">Avatar URL (optional)</label>
                  <Input id="avatarUrl" {...registerProfile('avatarUrl')} />
                  {profileErrors.avatarUrl && <p className="text-red-500 text-sm">{profileErrors.avatarUrl.message}</p>}
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1" htmlFor="currentPassword">Current Password</label>
                  <Input id="currentPassword" type="password" {...registerPassword('currentPassword')} />
                  {passwordErrors.currentPassword && <p className="text-red-500 text-sm">{passwordErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="newPassword">New Password</label>
                  <Input id="newPassword" type="password" {...registerPassword('newPassword')} />
                  {passwordErrors.newPassword && <p className="text-red-500 text-sm">{passwordErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                  <Input id="confirmPassword" type="password" {...registerPassword('confirmPassword')} />
                  {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword.message}</p>}
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-2">{a.action}</td>
                  <td className="p-2 text-sm text-muted-foreground">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
