import React, { useState, useEffect } from 'react'
import { useSchedulerStore, type SchedulerMessage } from '@/store/useSchedulerStore'
import { v4 as uuidv4 } from 'uuid'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export function Scheduler() {
  const { messages, addMessage, deleteMessage } = useSchedulerStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState(new Date())

  const handleCreate = () => {
    if (!title.trim()) return
    const msg: SchedulerMessage = {
      id: uuidv4(),
      title,
      content,
      scheduledAt: date.toISOString(),
      recurring: false,
    }
    addMessage(msg)
    setTitle('')
    setContent('')
    setDate(new Date())
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Scheduler</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Scheduled Message</Button>
      </div>

      {/* Calendar view */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar value={new Date()} />
        </CardContent>
      </Card>

      {/* List of scheduled messages */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {messages.length === 0 && <p className="text-muted-foreground">No scheduled messages.</p>}
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-center justify-between p-2 rounded bg-muted">
              <div>
                <p className="font-medium">{msg.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(msg.scheduledAt).toLocaleString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteMessage(msg.id)}>
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Scheduled Message">
        <div className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <label className="block text-sm font-medium text-foreground">Schedule Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={date.toISOString().slice(0, 16)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Scheduler;
