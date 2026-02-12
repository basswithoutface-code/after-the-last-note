import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const dataPath = path.join(process.cwd(), "data", "shared.json");

export async function POST(req: NextRequest) {
  try {
      const body = await req.json();
          const { type, content } = body;

              if (!type || !content) {
                    return NextResponse.json({ error: "invalid request" }, { status: 400 });
                        }

                            const file = fs.readFileSync(dataPath, "utf-8");
                                const data = JSON.parse(file);

                                    const entry = {
                                          id: randomUUID(),
                                                content,
                                                      createdAt: Date.now()
                                                          };

                                                              if (type === "text") {
                                                                    data.text.push(entry);
                                                                        } else if (type === "audio") {
                                                                              data.audio.push(entry);
                                                                                  } else {
                                                                                        return NextResponse.json({ error: "invalid type" }, { status: 400 });
                                                                                            }

                                                                                                fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

                                                                                                    return NextResponse.json({ success: true });
                                                                                                      } catch (error) {
                                                                                                          return NextResponse.json({ error: "server error" }, { status: 500 });
                                                                                                            }
                                                                                                            }