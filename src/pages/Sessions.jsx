import { useState } from 'react'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { SESSIONS } from '../data/mockData'

const TABS = ['All', 'Upcoming', 'Completed']

const STATUS_BADGE = {
  upcoming: { variant: 'blue', label: 'Upcoming' },
  completed: { variant: 'green', label: 'Completed' },
  cancelled: { variant: 'orange', label: 'Cancelled' },
}

export default function Sessions() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = SESSIONS.filter((s) => {
    if (activeTab === 'All') return true
    return s.status === activeTab.toLowerCase()
  })

  return (
    <Layout>
      <div className="mb-8">
        <h1
          className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-2"
          style={{ letterSpacing: '-1.5px' }}
        >
          Sessions
        </h1>
        <p className="text-[#615d59] text-lg">Your teaching and learning history.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-black/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              'px-4 py-2.5 text-sm font-semibold transition-colors duration-150 outline-none',
              'border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-[#097fe8] rounded-t',
              activeTab === tab
                ? 'border-[#0075de] text-[#0075de]'
                : 'border-transparent text-[#615d59] hover:text-[rgba(0,0,0,0.95)]',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Session list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#615d59] text-lg mb-3">No sessions here yet.</p>
          <Button onClick={() => {}} variant="secondary">Explore skills</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-2xl">
          {filtered.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </Layout>
  )
}

function SessionCard({ session }) {
  const { variant, label } = STATUS_BADGE[session.status] ?? STATUS_BADGE.upcoming

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <Avatar src={session.teacherAvatar} name={session.teacherName} size="md" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="font-bold text-[rgba(0,0,0,0.95)]">{session.skill}</p>
            <Badge variant={variant}>{label}</Badge>
          </div>

          <p className="text-sm text-[#615d59] mb-3">with {session.teacherName}</p>

          <div className="flex items-center gap-4 text-xs text-[#a39e98]">
            <span>{session.date}</span>
            <span className="w-px h-3 bg-black/10" />
            <span>{session.time}</span>
            <span className="w-px h-3 bg-black/10" />
            <span>{session.duration} min</span>
          </div>
        </div>
      </div>

      {session.status === 'upcoming' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-black/10">
          <Button size="sm" variant="secondary">Reschedule</Button>
          <Button size="sm" variant="ghost">Cancel</Button>
        </div>
      )}

      {session.status === 'completed' && (
        <div className="mt-4 pt-4 border-t border-black/10">
          <Button size="sm" variant="secondary">Leave a review</Button>
        </div>
      )}
    </Card>
  )
}
