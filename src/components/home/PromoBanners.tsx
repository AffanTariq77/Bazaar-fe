const BANNERS = [
  { title: 'Free Shipping', subtitle: 'On eligible orders across Pakistan', className: 'bg-primary-50 text-primary-700' },
  { title: 'Easy Returns', subtitle: '7-day return policy', className: 'bg-emerald-50 text-emerald-700' },
  { title: 'Cash on Delivery', subtitle: 'Pay when it arrives', className: 'bg-amber-50 text-amber-700' },
]

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {BANNERS.map((b) => (
          <div key={b.title} className={`rounded-lg p-5 ${b.className}`}>
            <p className="font-semibold">{b.title}</p>
            <p className="text-sm opacity-80">{b.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
