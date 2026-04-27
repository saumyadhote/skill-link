import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import { CURRENT_USER } from '../../data/mockData'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/explore', label: 'Explore' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/database', label: 'Database' },
]

export default function Navbar({ isAuth }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="w-full bg-white border-b border-black/10">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={isAuth ? '/dashboard' : '/'}
          className="flex items-center gap-2 font-bold text-[rgba(0,0,0,0.95)] text-base tracking-tight no-underline"
        >
          <span className="w-7 h-7 rounded-lg bg-[#0075de] flex items-center justify-center text-white text-sm font-bold">
            S
          </span>
          SkillLink
        </Link>

        {/* Desktop nav */}
        {isAuth && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'px-3 py-1.5 rounded text-[0.9375rem] font-medium transition-colors duration-150',
                    isActive
                      ? 'text-[#0075de] font-semibold'
                      : 'text-[rgba(0,0,0,0.95)] hover:text-[#0075de]',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuth ? (
            <>
              <Link to={`/profile/${CURRENT_USER.id}`} className="hidden md:block">
                <Avatar src={CURRENT_USER.avatar} name={CURRENT_USER.name} size="sm" />
              </Link>
              <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:inline text-[0.9375rem] font-medium text-[rgba(0,0,0,0.95)] hover:text-[#0075de] transition-colors"
              >
                Sign in
              </Link>
              <Button size="sm" onClick={() => navigate('/signup')}>
                Get started free
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          {isAuth && (
            <button
              className="md:hidden p-2 rounded text-[rgba(0,0,0,0.7)] hover:bg-[#f6f5f4] transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isAuth && menuOpen && (
        <div className="md:hidden border-t border-black/10 px-6 py-3 flex flex-col gap-1 bg-white">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'px-3 py-2 rounded text-[0.9375rem] font-medium',
                  isActive ? 'text-[#0075de] font-semibold' : 'text-[rgba(0,0,0,0.95)]',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
