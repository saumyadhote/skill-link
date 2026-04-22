import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import { CURRENT_USER, SESSIONS, USERS } from '../data/mockData'

const STAT_CARDS = [
  { label: 'Skills teaching', value: CURRENT_USER.teaches.length, color: '#0075de' },
  { label: 'Skills learning', value: CURRENT_USER.learns.length, color: '#2a9d99' },
  { label: 'Sessions done', value: CURRENT_USER.sessionsCompleted, color: '#1aae39' },
  { label: 'Rating', value: `${CURRENT_USER.rating}★`, color: '#dd5b00' },
]

export default function Dashboard() {
  const upcoming = SESSIONS.filter((s) => s.status === 'upcoming')
  const suggestedUsers = USERS.slice(0, 3)

  return (
    <Layout>
      {/* Welcome header */}
      <section className="mb-10">
        <h1
          className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-1"
          style={{ letterSpacing: '-1.5px' }}
        >
          Good morning, {CURRENT_USER.name.split(' ')[0]} 👋
        </h1>
        <p className="text-[#615d59] text-lg">Here's what's happening with your skills.</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map(({ label, value, color }) => (
          <Card key={label} className="p-5">
            <p
              className="text-[2rem] font-bold leading-none mb-1"
              style={{ color, letterSpacing: '-1px' }}
            >
              {value}
            </p>
            <p className="text-sm text-[#615d59] font-medium">{label}</p>
          </Card>
        ))}
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Upcoming sessions */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[rgba(0,0,0,0.95)]">Upcoming sessions</h2>
            <Link to="/sessions" className="text-sm text-[#0075de] font-medium hover:underline">
              View all
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-[#615d59] mb-4">No upcoming sessions yet.</p>
              <Button onClick={() => {}} variant="secondary">Browse skills</Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: my skills + suggestions */}
        <div className="flex flex-col gap-6">
          {/* My skills */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">I teach</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {CURRENT_USER.teaches.map((s) => (
                <Badge key={s} variant="blue">{s}</Badge>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">I'm learning</h3>
            <div className="flex flex-wrap gap-1.5">
              {CURRENT_USER.learns.map((s) => (
                <Badge key={s} variant="gray">{s}</Badge>
              ))}
            </div>
          </Card>

          {/* Suggested matches */}
          <div>
            <h2 className="text-lg font-bold text-[rgba(0,0,0,0.95)] mb-4">Suggested matches</h2>
            <div className="flex flex-col gap-3">
              {suggestedUsers.map((user) => (
                <Link key={user.id} to={`/profile/${user.id}`} className="no-underline">
                  <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[rgba(0,0,0,0.95)] truncate">{user.name}</p>
                        <p className="text-xs text-[#615d59] truncate">{user.teaches[0]}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function SessionRow({ session }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar src={session.teacherAvatar} name={session.teacherName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.95)] truncate">{session.skill}</p>
          <p className="text-xs text-[#615d59]">with {session.teacherName}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-medium text-[rgba(0,0,0,0.95)]">{session.date}</p>
          <p className="text-xs text-[#615d59]">{session.time}</p>
        </div>
      </div>
    </Card>
  )
}
