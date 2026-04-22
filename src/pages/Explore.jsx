import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'
import { USERS, SKILL_CATEGORIES } from '../data/mockData'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = USERS.filter((user) => {
    const allSkills = [...user.teaches, ...user.learns].map((s) => s.toLowerCase())
    const matchesQuery =
      query.trim() === '' ||
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      allSkills.some((s) => s.includes(query.toLowerCase()))

    const matchesCategory =
      activeCategory === 'All' ||
      user.teaches.some((s) =>
        s.toLowerCase().includes(activeCategory.toLowerCase())
      )

    return matchesQuery && matchesCategory
  })

  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <h1
          className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-2"
          style={{ letterSpacing: '-1.5px' }}
        >
          Explore skills
        </h1>
        <p className="text-[#615d59] text-lg mb-6">
          Find someone to teach you anything.
        </p>

        <Input
          id="search"
          placeholder="Search by skill or name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#097fe8] rounded-full"
          >
            <Badge
              variant={activeCategory === cat ? 'blue' : 'gray'}
              className={[
                'cursor-pointer transition-all duration-150 px-3 py-1.5 text-xs',
                activeCategory !== cat && 'opacity-70 hover:opacity-100',
              ].join(' ')}
            >
              {cat}
            </Badge>
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#a39e98] mb-5">
        {filtered.length} {filtered.length === 1 ? 'person' : 'people'} found
      </p>

      {/* User grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#615d59] text-lg">No results for "{query}".</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('All') }}
            className="mt-3 text-[#0075de] font-medium text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </Layout>
  )
}

function UserCard({ user }) {
  return (
    <Link to={`/profile/${user.id}`} className="no-underline">
      <Card className="p-5 h-full hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start gap-3 mb-4">
          <Avatar src={user.avatar} name={user.name} size="md" />
          <div className="min-w-0">
            <p className="font-bold text-[rgba(0,0,0,0.95)] truncate">{user.name}</p>
            <p className="text-xs text-[#a39e98]">
              ★ {user.rating} · {user.sessionsCompleted} sessions
            </p>
          </div>
        </div>

        <p className="text-sm text-[#615d59] leading-relaxed mb-4 line-clamp-2">{user.bio}</p>

        <div className="mb-3">
          <p className="text-xs font-semibold text-[rgba(0,0,0,0.95)] mb-1.5">Teaches</p>
          <div className="flex flex-wrap gap-1.5">
            {user.teaches.slice(0, 3).map((s) => (
              <Badge key={s} variant="blue">{s}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[rgba(0,0,0,0.95)] mb-1.5">Learning</p>
          <div className="flex flex-wrap gap-1.5">
            {user.learns.slice(0, 3).map((s) => (
              <Badge key={s} variant="gray">{s}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
