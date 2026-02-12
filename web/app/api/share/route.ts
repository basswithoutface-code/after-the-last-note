import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "shared.json")

export async function POST(req: Request) {
  try {
      const body = await req.json()
          const { type, content } = body

              const fileData = fs.readFileSync(filePath, "utf8")
                  const parsed = JSON.parse(fileData)

                      if (type === "text") {
                            parsed.text.push(content)
                                }

                                    if (type === "audio") {
                                          parsed.audio.push(content)
                                              }

                                                  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))

                                                      return NextResponse.json({ success: true })
                                                        } catch (error) {
                                                            console.error("SHARE ERROR:", error)
                                                                return NextResponse.json({ error: "failed" }, { status: 500 })
                                                                  }
                                                                  }