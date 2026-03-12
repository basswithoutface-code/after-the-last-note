"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ListeningPage() {
  const router = useRouter()

    const [content, setContent] = useState<string | null>(null)

      async function getRead() {
          const res = await fetch("/api/random?type=text")
              const data = await res.json()
                  setContent(data.content)
                    }

                      async function getListen() {
                          const res = await fetch("/api/random?type=audio")
                              const data = await res.json()

                                  const audio = new Audio(data.content)
                                      audio.play()
                                        }

                                          async function shuffle() {
                                              const res = await fetch("/api/random")
                                                  const data = await res.json()

                                                      if (data.type === "text") {
                                                            setContent(data.content)
                                                                }

                                                                    if (data.type === "audio") {
                                                                          const audio = new Audio(data.content)
                                                                                audio.play()
                                                                                    }
                                                                                      }

                                                                                        if (content) {
                                                                                            return (
                                                                                                  <main
                                                                                                          className="screen"
                                                                                                                  onClick={() => setContent(null)}
                                                                                                                          style={{
                                                                                                                                    display: "flex",
                                                                                                                                              justifyContent: "center",
                                                                                                                                                        alignItems: "center",
                                                                                                                                                                  textAlign: "center",
                                                                                                                                                                            padding: "40px",
                                                                                                                                                                                      fontSize: "18px"
                                                                                                                                                                                              }}
                                                                                                                                                                                                    >
                                                                                                                                                                                                            {content}
                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                      )
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                          return (
                                                                                                                                                                                                                              <main className="screen">
                                                                                                                                                                                                                                    <section className="stack">

                                                                                                                                                                                                                                            <button className="pill" onClick={getRead}>
                                                                                                                                                                                                                                                      read
                                                                                                                                                                                                                                                              </button>

                                                                                                                                                                                                                                                                      <button className="pill" onClick={getListen}>
                                                                                                                                                                                                                                                                                listen
                                                                                                                                                                                                                                                                                        </button>

                                                                                                                                                                                                                                                                                                <button className="pill" onClick={shuffle}>
                                                                                                                                                                                                                                                                                                          shuffle
                                                                                                                                                                                                                                                                                                                  </button>

                                                                                                                                                                                                                                                                                                                          <div style={{ height: "40px" }} />

                                                                                                                                                                                                                                                                                                                                  <button
                                                                                                                                                                                                                                                                                                                                            className="pill"
                                                                                                                                                                                                                                                                                                                                                      onClick={() => router.push("/third")}
                                                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                                                        previous
                                                                                                                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                                                                                                            )
                                                                                                                                                                                                                                                                                                                                                                                            }