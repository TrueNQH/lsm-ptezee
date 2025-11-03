export default function Pricing() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pricing</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[['Free', 0], ['Standard', 19], ['Premium', 49]].map(([name, price]) => (
          <div key={name} className="rounded-lg border p-4">
            <h3 className="font-semibold">{name}</h3>
            <p className="mt-2 text-sm">${price}/mo</p>
          </div>
        ))}
      </div>
    </div>
  )
}