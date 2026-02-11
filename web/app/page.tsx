"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
    const [stage, setStage] = useState<0 | 1 | 2>(0);
      const timers = useRef<number[]>([]);

        const clearTimers = () => {
            timers.current.forEach((t) => window.clearTimeout(t));
                timers.current = [];
                  };

                    const goNext = () => {
                        clearTimers();
                            router.push("/second");
                              };

                                useEffect(() => {
                                    clearTimers();

                                        // 1s → main line
                                            timers.current.push(window.setTimeout(() => setStage(1), 1000));

                                                // +1.5s → enter
                                                    timers.current.push(window.setTimeout(() => setStage(2), 2500));

                                                        // +3s after enter → auto advance
                                                            timers.current.push(window.setTimeout(() => goNext(), 5500));

                                                                return () => clearTimers();
                                                                    // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                      }, []);

                                                                        const onTap = () => {
                                                                            // allow tap-to-advance only once "enter" is visible
                                                                                if (stage >= 2) goNext();
                                                                                  };

                                                                                    return (
                                                                                        <main className="screen" onClick={onTap}>
                                                                                              {/* logo / mark */}
                                                                                                    <div
                                                                                                            style={{
                                                                                                                      position: "absolute",
                                                                                                                                top: 24,
                                                                                                                                          left: 0,
                                                                                                                                                    right: 0,
                                                                                                                                                              textAlign: "center",
                                                                                                                                                                        letterSpacing: "0.28em",
                                                                                                                                                                                  fontSize: 12,
                                                                                                                                                                                            color: "rgba(235,235,235,0.55)",
                                                                                                                                                                                                      pointerEvents: "none",
                                                                                                                                                                                                              }}
                                                                                                                                                                                                                    >
                                                                                                                                                                                                                            ATLN
                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                        <section className="stack" aria-label="intro">
                                                                                                                                                                                                                                                {stage >= 1 && (
                                                                                                                                                                                                                                                          <p className={`mainLine ${stage === 1 ? "fadeIn" : ""}`}>
                                                                                                                                                                                                                                                                      no names. no echo. just now.
                                                                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                                                                        )}

                                                                                                                                                                                                                                                                                                {stage >= 2 && (
                                                                                                                                                                                                                                                                                                          <p className={`enterLine ${stage === 2 ? "fadeIn" : ""}`}>enter</p>
                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                        </section>
                                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                              