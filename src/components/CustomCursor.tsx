import { useEffect, useRef, useState } from "react"

export function CustomCursor() {

  const wrapperRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })))

  const idleTimer = useRef<any>(null)

  const [visible, setVisible] = useState(true)
  const [hover, setHover] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {

    const move = (e: MouseEvent) => {

      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      setVisible(true)

      if (idleTimer.current) clearTimeout(idleTimer.current)

      idleTimer.current = setTimeout(() => {
        setVisible(false)
      }, 7000)

    }

    const detect = (e: MouseEvent) => {

      const el = e.target as HTMLElement

      setHover(
        !!el.closest("button") ||
        !!el.closest("a") ||
        el.classList.contains("cursor-pointer")
      )

      setTyping(
        !!el.closest("input") ||
        !!el.closest("textarea")
      )

    }

    const animate = () => {

      pos.current = pos.current.map((p, i) => {

        const prev = i === 0 ? mouse.current : pos.current[i - 1]

        return {
          x: p.x + (prev.x - p.x) * 0.35,
          y: p.y + (prev.y - p.y) * 0.35
        }

      })

      if (wrapperRef.current) {

        wrapperRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px)`

      }

      trailRefs.current.forEach((el, i) => {

        if (!el) return

        const p = pos.current[i]

        el.style.transform =
          `translate(${p.x}px, ${p.y}px)`

      })

      requestAnimationFrame(animate)

    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousemove", detect)

    animate()

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousemove", detect)
    }

  }, [])

  return (
    <>

      {/* CURSOR WRAPPER (locks pointer position) */}

      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity .25s"
        }}
      >

        <div
          ref={cursorRef}
          style={{
            transform: `translate(-4px,-4px) scale(${hover ? 1.3 : typing ? 0.6 : 1})`,
            transformOrigin: "4px 4px",
            transition: "transform .15s"
          }}
        >

          {typing ? (

            <div
              style={{
                width: "2px",
                height: "22px",
                background: "linear-gradient(180deg,#06b6d4,#8b5cf6)",
                animation: "blink 1s infinite"
              }}
            />

          ) : (

            <svg width="26" height="26" viewBox="0 0 24 24">
              <path
                d="M4 2L20 12L12 14L10 22Z"
                fill="#06b6d4"
                stroke="#8b5cf6"
                strokeWidth="1.4"
              />
            </svg>

          )}

        </div>

      </div>


      {/* TRAILS */}

      {Array.from({ length: 5 }).map((_, i) => (

        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: "fixed",
            width: `${5 - i}px`,
            height: `${5 - i}px`,
            borderRadius: "50%",
            background: i % 2 ? "#8b5cf6" : "#06b6d4",
            opacity: visible ? 0.6 - i * 0.1 : 0,
            pointerEvents: "none",
            zIndex: 9998
          }}
        />

      ))}

      <style>{`

        *{
          cursor:none !important;
        }

        @keyframes blink{
          0%,50%,100%{opacity:1}
          25%,75%{opacity:0}
        }

        @media(pointer:coarse){
          *{
            cursor:auto !important;
          }
        }

      `}</style>

    </>
  )
}