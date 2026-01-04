"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

    // 0: blank
      // 1: main line visible
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

                                              const BEAT = 1000; // base beat
                                                  const FADE_GAP = 1500; // main -> enter
                                                      const AUTO_AFTER_ENTER = 3000;

                                                          timers.current.push(window.setTimeout(() => setStage(1), BEAT));
                                                              timers.current.push(window.setTimeout(() => setStage(2), BEAT + FADE_GAP));
                                                                  timers.current.push(
                                                                        window.setTimeout(
                                                                                () => advance(),
                                                                                        BEAT + FADE_GAP + AUTO_AFTER_ENTER
                                                                                              )
                                                                                                  );

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
                                                                                                                                                              No names. No echo. Just now.
                                                                                                                                                                        </p>
                                                                                                                                                                                )}

                                                                                                                                                                                        {stage >= 2 && <p className="enterLine fadeIn">enter</p>}
                                                                                                                                                                                              </section>
                                                                                                                                                                                                  </main>
                                                                                                                                                                                                    );
                                                                                                                                                                                                    }
                                                                                                                                                                                                    