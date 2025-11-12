"use client"

import { useEffect, useState, useMemo } from "react"

type Section = { id: string; label: string }

export default function ConceptsTOC({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string | null>(null)

  const ids = useMemo(() => sections.map((s) => s.id), [sections])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? -1 : 1))
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [ids])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border">
      <h4 className="text-sm font-semibold mb-3">On this page</h4>
      <ul className="space-y-2 text-sm">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className={
                active === s.id
                  ? "text-blue-600 font-medium underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
              }
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
