import { CategoryGrid } from '../components/home/CategoryGrid'
import { HeroCarousel } from '../components/home/HeroCarousel'
import { HomeSection } from '../components/home/HomeSection'
import { PromoBanners } from '../components/home/PromoBanners'

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CategoryGrid title="Categories" />
      <HomeSection title="Flash Sale" query={{ minDiscount: 20, sort: 'newest', limit: 10 }} />
      <HomeSection title="Just For You" query={{ sort: 'newest', limit: 10 }} />
      <PromoBanners />
      <HomeSection title="Popular Products" query={{ sort: 'popular', limit: 10 }} />
      <HomeSection title="Recommended Products" query={{ sort: 'rating', limit: 10 }} />
      <CategoryGrid title="Popular Categories" sortByPopularity limit={6} />
    </>
  )
}
