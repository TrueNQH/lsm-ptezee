import { NavLink, Outlet } from 'react-router-dom'

const items = [
  { to: '/student/overview', label: 'Overview' },
  { to: '/student/center', label: 'Student Center' },
  { to: '/student/materials', label: 'Learning Materials' },
  { to: '/student/services', label: 'Services' },
  { to: '/student/support', label: 'Support' },
]

export default function StudentLayout() {
  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="rounded-lg border p-4">
        <nav className="flex flex-col gap-2">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} className={({isActive}) => isActive ? 'text-brand font-medium' : ''}>
              {i.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  )
}