"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2;
// 0: blank
// 1: signal visible + audio playing
// 2: text visible + tap enabled + countdown to auto-advance

export default function SecondPage() {
  const router = useRouter();

    const [stage, setStage] = useState<Stage>(0);
      const [tapEnabled, setTapEnabled] = useState(false);

        const timers = useRef<number[]>([]);
          const audioRef = useRef<HTMLAudioElement | null>(null);

            const BEAT = 1000;
              const AFTER_AUDIO = 1500;
                const FINAL_WINDOW = 3000;

                  const clearTimers = () => {
                      timers.current.forEach((t) => window.clearTimeout(t));
                          timers.current = [];
                            };

                              const advance = () => {
                                  clearTimers();
                                      if (audioRef.current) {
                                            audioRef.current.pause();
                                                  audioRef.current.currentTime = 0;
                                                      }
                                                          router.push("/third");
                                                            };

                                                              const startFinalWindow = () => {
                                                                  setStage(2);
                                                                      setTapEnabled(true);
                                                                          timers.current.push(window.setTimeout(() => advance(), FINAL_WINDOW));
                                                                            };

                                                                              useEffect(() => {
                                                                                  clearTimers();

                                                                                      timers.current.push(
                                                                                            window.setTimeout(() => {
                                                                                                    setStage(1);

                                                                                                            const a = audioRef.current;
                                                                                                                    if (!a) return;

                                                                                                                            a.currentTime = 0;
                                                                                                                                    a.play().catch(() => {
                                                                                                                                              // Autoplay may be blocked on mobile.
                                                                                                                                                        // One tap (while stage === 1) will attempt play again.
                                                                                                                                                                });
                                                                                                                                                                      }, BEAT)
                                                                                                                                                                          );

                                                                                                                                                                              return () => clearTimers();
                                                                                                                                                                                  // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                                                                                                                    }, []);

                                                                                                                                                                                      const onAudioEnded = () => {
                                                                                                                                                                                          clearTimers();
                                                                                                                                                                                              timers.current.push(window.setTimeout(() => startFinalWindow(), AFTER_AUDIO));
                                                                                                                                                                                                };

                                                                                                                                                                                                  const onTap = () => {
                                                                                                                                                                                                      if (tapEnabled) {
                                                                                                                                                                                                            advance();
                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                      }

                                                                                                                                                                                                                          // If autoplay was blocked, one tap can start audio once signal is visible.
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

                                                                                                                                                                                                                                                                                                              {stage >= 2 && <p className="mainLine fadeIn">It existed.</p>}
                                                                                                                                                                                                                                                                                                                    </section>

                                                                                                                                                                                                                                                                                                                          <audio
                                                                                                                                                                                                                                                                                                                                  ref={audioRef}
                                                                                                                                                                                                                                                                                                                                          src="/Atln.m4a"
                                                                                                                                                                                                                                                                                                                                                  preload="auto"
                                                                                                                                                                                                                                                                                                                                                          onEnded={onAudioEnded}
                                                                                                                                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                      