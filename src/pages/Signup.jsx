import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const SUGGESTED_SKILLS = ['Python', 'JavaScript', 'React', 'Guitar', 'Spanish', 'Photography', 'Piano', 'Design', 'Cooking']

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [teaches, setTeaches] = useState([])
  const [learns, setLearns] = useState([])

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const toggleSkill = (skill, list, setList) => {
    setList((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <Layout isAuth={false}>
      <div className="min-h-[80vh] flex items-center justify-center py-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1
              className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-2"
              style={{ letterSpacing: '-1.5px' }}
            >
              Join SkillLink
            </h1>
            <p className="text-[#615d59] text-base">
              Teach what you know. Learn what you love.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                id="name"
                label="Full name"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange('password')}
                required
              />

              <SkillPicker
                label="Skills I can teach"
                skills={SUGGESTED_SKILLS}
                selected={teaches}
                onToggle={(s) => toggleSkill(s, teaches, setTeaches)}
                badgeVariant="blue"
              />

              <SkillPicker
                label="Skills I want to learn"
                skills={SUGGESTED_SKILLS}
                selected={learns}
                onToggle={(s) => toggleSkill(s, learns, setLearns)}
                badgeVariant="gray"
              />

              <Button type="submit" size="lg" className="w-full mt-1">
                Create account
              </Button>

              <p className="text-center text-sm text-[#615d59]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0075de] font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

function SkillPicker({ label, skills, selected, onToggle, badgeVariant }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[rgba(0,0,0,0.95)]">{label}</span>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => onToggle(skill)}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#097fe8] rounded-full"
          >
            <Badge
              variant={selected.includes(skill) ? badgeVariant : 'gray'}
              className={[
                'cursor-pointer transition-all duration-150',
                selected.includes(skill) ? 'ring-1 ring-[#0075de]' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              {skill}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}
