import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "shared.json");

export async function GET() {
  try {
      const file = fs.readFileSync(dataPath, "utf-8");
          const data = JSON.parse(file);

              const combined = [
                    ...data.text.map((t: any) => ({
                            type: "text",
                                    content: t.content
                                          })),
                                                ...data.audio.map((a: any) => ({
                                                        type: "audio",
                                                                content: a.content
                                                                      }))
                                                                          ];

                                                                              if (combined.length === 0) {
                                                                                    return NextResponse.json({ empty: true });
                                                                                        }

                                                                                            const random =
                                                                                                  combined[Math.floor(Math.random() * combined.length)];

                                                                                                      return NextResponse.json(random);
                                                                                                        } catch (error) {
                                                                                                            return NextResponse.json({ empty: true });
                                                                                                              }
                                                                                                              }