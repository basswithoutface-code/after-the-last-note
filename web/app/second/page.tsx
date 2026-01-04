"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2;
// 0: blank
// 1: signal visible + audio playing
// 2: text visible + tap enabled + 3s countdown to auto-advance

export default function SecondPage() {
  const router = useRouter();

    const [stage, setStage] = useState<Stage>(0);
      const [tapEnabled, setTapEnabled] = useState(false);

        const timers = useRef<number[]>([]);
          const audioRef = useRef<HTMLAudioElement | null>(null);

            const clearTimers = () => {
                timers.current.forEach((t) => window.clearTimeout(t));
                    timers.current = [];
                      };

                        const advance = () => {
                            clearTimers();
                                // stop audio if still playing
                                    if (audioRef.current) {
                                          audioRef.current.pause();
                                                audioRef.current.currentTime = 0;
                                                    }
                                                        router.push("/third");
                                                          };

                                                            const startFinalWindow = () => {
                                                                setStage(2);
                                                                    setTapEnabled(true);

                                                                        // 3s after text appears -> auto-advance
                                                                            timers.current.push(window.setTimeout(() => advance(), 3000));
                                                                              };

                                                                                useEffect(() => {
                                                                                    clearTimers();

                                                                                        // +1.0s -> show signal + play audio
                                                                                            timers.current.push(
                                                                                                  window.setTimeout(() => {
                                                                                                          setStage(1);

                                                                                                                  const a = audioRef.current;
                                                                                                                          if (!a) return;

                                                                                                                                  // Try to play. If autoplay blocks, we’ll wait for first tap.
                                                                                                                                          a.currentTime = 0;
                                                                                                                                                  a.play().catch(() => {
                                                                                                                                                            // Autoplay may be blocked on some mobile browsers.
                                                                                                                                                                      // We'll allow the user to tap once to start audio.
                                                                                                                                                                              });
                                                                                                                                                                                    }, 1000)
                                                                                                                                                                                        );

                                                                                                                                                                                            return () => clearTimers();
                                                                                                                                                                                                // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                                                                                                                                  }, []);

                                                                                                                                                                                                    const onAudioEnded = () => {
                                                                                                                                                                                                        // after audio ends -> wait 1.5s -> show text and start 3s window
                                                                                                                                                                                                            clearTimers();
                                                                                                                                                                                                                timers.current.push(window.setTimeout(() => startFinalWindow(), 1500));
                                                                                                                                                                                                                  };

                                                                                                                                                                                                                    const onTap = () => {
                                                                                                                                                                                                                        // Tap is only allowed during the final 3s window (stage 2)
                                                                                                                                                                                                                            if (tapEnabled) {
                                                                                                                                                                                                                                  advance();
                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                // If autoplay was blocked, a tap can start audio once stage 1 is visible.
                                                                                                                                                                                                                                                    if (stage === 1 && audioRef.current) {
                                                                                                                                                                                                                                                          audioRef.current.play().catch(() => {});
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                  return (
                                                                                                                                                                                                                                                                      <main className="screen" onClick={onTap}>
                                                                                                                                                                                                                                                                            <section className="stack" aria-label="Transition">
                                                                                                                                                                                                                                                                                    {stage >= 1 && (
                                                                                                                                                                                                                                                                                              <div className={`signalWrap ${stage === 1 ? "fadeIn" : ""}`}>
                                                                                                                                                                                                                                                                                                          <div className="signalDot" />
                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                            )}

                                                                                                                                                                                                                                                                                                                                    {stage >= 2 && (
                                                                                                                                                                                                                                                                                                                                              <p className="mainLine fadeIn">
                                                                                                                                                                                                                                                                                                                                                          It existed while you were listening.
                                                                                                                                                                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                  </section>

                                                                                                                                                                                                                                                                                                                                                                                        {/* Hidden audio element */}
                                                                                                                                                                                                                                                                                                                                                                                              <audio
                                                                                                                                                                                                                                                                                                                                                                                                      ref={audioRef}
                                                                                                                                                                                                                                                                                                                                                                                                              src="/Atln.m4a"
                                                                                                                                                                                                                                                                                                                                                                                                                      preload="auto"
                                                                                                                                                                                                                                                                                                                                                                                                                              onEnded={onAudioEnded}
                                                                                                                                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                                                                                                                                        </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                          }

