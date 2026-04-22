import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import { USERS, CURRENT_USER } from '../data/mockData'

export default function TeacherProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booked, setBooked] = useState(null)

  const user = id === CURRENT_USER.id
    ? CURRENT_USER
    : USERS.find((u) => u.id === id)

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-[#615d59] text-lg">User not found.</p>
          <Button onClick={() => navigate('/explore')} variant="secondary" className="mt-4">
            Back to Explore
          </Button>
        </div>
      </Layout>
    )
  }

  const isOwnProfile = id === CURRENT_USER.id

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Profile header */}
        <Card className="p-8 mb-6">
          <div className="flex items-start gap-5 mb-5">
            <Avatar src={user.avatar} name={user.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h1
                className="text-[1.75rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-1"
                style={{ letterSpacing: '-0.625px' }}
              >
                {user.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#615d59] mb-3">
                <span>★ {user.rating}</span>
                <span className="w-px h-3 bg-black/10" />
                <span>{user.sessionsCompleted} sessions</span>
              </div>
              {!isOwnProfile && (
                <Button size="sm" onClick={() => navigate('/sessions')}>
                  Book a session
                </Button>
              )}
            </div>
          </div>

          <p className="text-[#615d59] text-base leading-relaxed">{user.bio}</p>
        </Card>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">
              {isOwnProfile ? 'I teach' : `${user.name.split(' ')[0]} teaches`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.teaches.map((s) => (
                <Badge key={s} variant="blue">{s}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">
              {isOwnProfile ? "I'm learning" : `${user.name.split(' ')[0]} wants to learn`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.learns.map((s) => (
                <Badge key={s} variant="gray">{s}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Availability */}
        {user.availability && (
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">Availability</h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {user.availability.map((slot) => (
                <button
                  key={slot}
                  onClick={() => !isOwnProfile && setBooked(slot)}
                  disabled={isOwnProfile}
                  className={[
                    'px-3 py-1.5 rounded border text-sm font-medium transition-all duration-150 outline-none',
                    'focus-visible:ring-2 focus-visible:ring-[#097fe8]',
                    booked === slot
                      ? 'bg-[#0075de] text-white border-[#0075de]'
                      : 'bg-white text-[rgba(0,0,0,0.95)] border-black/10 hover:border-[#0075de] hover:text-[#0075de]',
                    isOwnProfile && 'cursor-default',
                  ].join(' ')}
                >
                  {slot}
                </button>
              ))}
            </div>

            {!isOwnProfile && (
              <Button
                onClick={() => booked && navigate('/sessions')}
                disabled={!booked}
                className="w-full"
              >
                {booked ? `Book "${booked}"` : 'Select a time slot'}
              </Button>
            )}
          </Card>
        )}
      </div>
    </Layout>
  )
}
