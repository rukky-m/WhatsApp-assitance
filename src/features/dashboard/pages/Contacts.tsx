import React, { useEffect, useState } from 'react'
import { useContactsStore, type Contact } from '@/store/useContactsStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { v4 as uuidv4 } from 'uuid'
import { SearchInput } from '@/components/ui/SearchInput'

export function Contacts() {
  const { contacts, addContact, deleteContact, setLoading, loading } = useContactsStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [newContact, setNewContact] = useState({ name: '', email: '' })

  // Mock load on mount
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // Example contacts
      const mock: Contact[] = [
        { id: uuidv4(), name: 'Alice Johnson', email: 'alice@example.com' },
        { id: uuidv4(), name: 'Bob Smith', email: 'bob@example.com' },
        { id: uuidv4(), name: 'Carol Lee', email: 'carol@example.com' },
      ]
      mock.forEach((c) => addContact(c))
      setLoading(false)
    }, 500)
  }, [])

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    if (!newContact.name.trim() || !newContact.email.trim()) return
    const contact: Contact = { ...newContact, id: uuidv4() }
    addContact(contact)
    setNewContact({ name: '', email: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Contact</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <SearchInput placeholder="Search contacts…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading contacts…</p>
          ) : (
            <table className="w-full table-auto">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.email}</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm" onClick={() => deleteContact(c.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Contact">
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
