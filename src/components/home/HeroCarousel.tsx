import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    title: 'Big Savings Week',
    subtitle: 'Up to 70% off electronics, fashion and more',
    cta: 'Shop Now',
    to: '/products?sort=newest',
    className: 'bg-gradient-to-r from-primary-600 to-primary-400',
  },
  {
    title: 'Flash Sale Today',
    subtitle: 'Deep discounts, while stock lasts',
    cta: 'Grab Deals',
    to: '/products?minDiscount=20',
    className: 'bg-gradient-to-r from-gray-900 to-gray-700',
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh drops across every category',
    cta: 'Explore',
    to: '/products?sort=newest',
    className: 'bg-gradient-to-r from-amber-600 to-amber-400',
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[index]

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <div
        className={`flex min-h-[220px] flex-col items-start justify-center rounded-lg px-8 py-10 text-white ${slide.className}`}
      >
        <h1 className="text-3xl font-extrabold sm:text-4xl">{slide.title}</h1>
        <p className="mt-2 text-white/90">{slide.subtitle}</p>
        <Link
          to={slide.to}
          className="mt-5 rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
        >
          {slide.cta}
        </Link>
        <div className="mt-6 flex gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
