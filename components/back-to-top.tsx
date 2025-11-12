"use client"

import { useEffect, useState } from "react"

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-blue-600 text-white px-4 py-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      ↑ Top
    </button>
  )
}
