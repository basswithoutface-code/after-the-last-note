"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

    // 0: blank
      // 1: main text visible
        // 2: enter visible (tap enabled + auto-advance starts)
          const [stage, setStage] = useState<0 | 1 | 2>(0);
            const timers = useRef<number[]>([]);

              const clearTimers = () => {
                  timers.current.forEach((t) => window.clearTimeout(t));
                      timers.current = [];
                        };

                          const advance = () => {
                              clearTimers();
                                  router.push("/second");
                                    };

                                      useEffect(() => {
                                          clearTimers();

                                              // +1.0s -> show main line
                                                  timers.current.push(window.setTimeout(() => setStage(1), 1000));

                                                      // +1.5s after main -> show enter (total 2.5s)
                                                          timers.current.push(window.setTimeout(() => setStage(2), 2500));

                                                              // +3.0s after enter -> auto-advance (total 5.5s)
                                                                  timers.current.push(window.setTimeout(() => advance(), 5500));

                                                                      return () => clearTimers();
                                                                          // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                            }, []);

                                                                              const onTap = () => {
                                                                                  if (stage === 2) advance();
                                                                                    };

                                                                                      return (
                                                                                          <main className="screen" onClick={onTap}>
                                                                                                <section className="stack" aria-label="Intro">
                                                                                                        {stage >= 1 && (
                                                                                                                  <p className={`mainLine ${stage === 1 ? "fadeIn" : ""}`}>
                                                                                                                              No names. No echo. Just Now.
                                                                                                                                        </p>
                                                                                                                                                )}

                                                                                                                                                        {stage >= 2 && <p className="enterLine fadeIn">enter</p>}
                                                                                                                                                              </section>
                                                                                                                                                                  </main>
                                                                                                                                                                    );
                                                                                                                                                                    }
                                                                                                                                                                    