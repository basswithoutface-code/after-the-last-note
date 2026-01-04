"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2 | 3;
// 0: blank
// 1: "Who are you?" visible
// 2: "Tell me." button visible
// 3: "Stay quiet." visible (tap enabled + 6s auto-advance)

export default function ThirdPage() {
  const router = useRouter();

    const [stage, setStage] = useState<Stage>(0);
      const timers = useRef<number[]>([]);

        const clearTimers = () => {
            timers.current.forEach((t) => window.clearTimeout(t));
                timers.current = [];
                  };

                    const goListening = () => {
                        clearTimers();
                            router.push("/listening");
                              };

                                const goRecord = () => {
                                    clearTimers();
                                        router.push("/record");
                                          };

                                            useEffect(() => {
                                                clearTimers();

                                                    // +1.0s -> show question
                                                        timers.current.push(window.setTimeout(() => setStage(1), 1000));

                                                            // +1.5s after question -> show mic button (total 2.5s)
                                                                timers.current.push(window.setTimeout(() => setStage(2), 2500));

                                                                    // +3.0s after button -> show "Stay quiet." (total 5.5s)
                                                                        timers.current.push(window.setTimeout(() => setStage(3), 5500));

                                                                            // +6.0s after "Stay quiet." -> auto-advance to listening (total 11.5s)
                                                                                timers.current.push(window.setTimeout(() => goListening(), 11500));

                                                                                    return () => clearTimers();
                                                                                        // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                          }, []);

                                                                                            const onTapAnywhere = () => {
                                                                                                // Tap anywhere only works AFTER "Stay quiet." has appeared
                                                                                                    if (stage === 3) goListening();
                                                                                                      };

                                                                                                        return (
                                                                                                            <main className="screen" onClick={onTapAnywhere}>
                                                                                                                  <section className="stack" aria-label="Identity choice">
                                                                                                                          {stage >= 1 && (
                                                                                                                                    <p className={`mainLine ${stage === 1 ? "fadeIn" : ""}`}>
                                                                                                                                                Who are you?
                                                                                                                                                          </p>
                                                                                                                                                                  )}

                                                                                                                                                                          {stage >= 2 && (
                                                                                                                                                                                    <div style={{ marginTop: 26 }}>
                                                                                                                                                                                                <button
                                                                                                                                                                                                              onClick={(e) => {
                                                                                                                                                                                                                              e.stopPropagation();
                                                                                                                                                                                                                                              goRecord();
                                                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                                          background: "transparent",
                                                                                                                                                                                                                                                                                                          border: "1px solid rgba(235,235,235,0.35)",
                                                                                                                                                                                                                                                                                                                          color: "rgba(235,235,235,0.75)",
                                                                                                                                                                                                                                                                                                                                          padding: "12px 18px",
                                                                                                                                                                                                                                                                                                                                                          borderRadius: 999,
                                                                                                                                                                                                                                                                                                                                                                          fontSize: 18,
                                                                                                                                                                                                                                                                                                                                                                                          letterSpacing: "0.08em",
                                                                                                                                                                                                                                                                                                                                                                                                          cursor: "pointer",
                                                                                                                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                                                                                                                                      className={stage === 2 ? "fadeIn" : ""}
                                                                                                                                                                                                                                                                                                                                                                                                                                                    aria-label="Tell me"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Tell me.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {stage >= 3 && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <p className="enterLine fadeIn" style={{ marginTop: 26 }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Stay quiet.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        