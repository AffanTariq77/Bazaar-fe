import { useState } from 'react'

interface ImageGalleryProps {
  images: { id: string; url: string }[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        {current && <img src={current.url} alt={alt} className="h-full w-full object-cover" />}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 overflow-hidden rounded border-2 ${
                i === active ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
