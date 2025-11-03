export default function AdminDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {['User Mgmt','Student & Class','Course Mgmt','Reports','Revenue','Settings'].map((t) => (
        <div key={t} className="rounded-lg border p-4">
          <h3 className="font-semibold">{t}</h3>
          <p className="text-sm">Mock management module: {t}</p>
        </div>
      ))}
    </div>
  )
}