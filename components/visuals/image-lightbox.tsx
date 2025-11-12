"use client"

import React, { useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export interface LightboxImage {
  src: string
  alt?: string
  caption?: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  startIndex?: number
  thumbClassName?: string
  ariaLabel?: string
  className?: string
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  startIndex = 0,
  thumbClassName = "h-40 md:h-48",
  ariaLabel = "Image gallery",
  className = "",
}) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(startIndex)
  const [mounted, setMounted] = useState(false)

  // ensure DOM is ready before using createPortal
  useEffect(() => setMounted(true), [])

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const prev = useCallback(() => setIndex(i => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setIndex(i => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  // keyboard handling + scroll lock
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault()
          close()
          break
        case "ArrowLeft":
        case "h":
          prev()
          break
        case "ArrowRight":
        case "l":
          next()
          break
        case "Home":
          setIndex(0)
          break
        case "End":
          setIndex(images.length - 1)
          break
      }
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = prevOverflow
    }
  }, [open, prev, next, close, images.length])

  return (
    <div className={className} aria-label={ariaLabel}>
      {/* thumbnails */}
      <div className="flex gap-4 flex-wrap justify-center">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => openAt(i)}
            className={`group relative rounded-lg border border-border overflow-hidden bg-muted/40 hover:bg-muted transition ${thumbClassName}`}
          >
            <img
              src={img.src}
              alt={img.alt || img.caption || `image-${i + 1}`}
              className="h-full w-full object-cover"
            />
            {img.caption && (
              <span className="absolute bottom-1 left-2 text-xs text-foreground/80 bg-background/80 rounded px-1 py-0.5">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* render lightbox only on client and when open */}
      {mounted && open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md"
            >
              {/* close */}
              <button
                onClick={close}
                aria-label="Close lightbox"
                className="absolute right-6 top-6 rounded-full p-2 bg-background/90 hover:bg-background border border-border shadow"
              >
                <X className="w-5 h-5" />
              </button>

              {/* image */}
              <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt || images[index].caption || `image-${index + 1}`}
                className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-lg select-none"
                draggable={false}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />

              {/* navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border shadow transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border shadow transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

export default ImageLightbox
