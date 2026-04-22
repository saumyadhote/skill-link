import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <Layout isAuth={false}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-2"
              style={{ letterSpacing: '-1.5px' }}
            >
              Welcome back
            </h1>
            <p className="text-[#615d59] text-base">
              Sign in to continue learning and teaching.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

              <Button type="submit" size="lg" className="w-full mt-1">
                Sign in
              </Button>

              <p className="text-center text-sm text-[#615d59]">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[#0075de] font-medium hover:underline"
                >
                  Sign up free
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
