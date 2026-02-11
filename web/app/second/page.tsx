"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "idle" | "playing" | "text";

export default function SecondPage() {
  const router = useRouter();

    // ✅ set this to your actual file in /web/public
      // example: "/after-the-last-note.m4a"
        const AUDIO_SRC = "/after-the-last-note.m4a";

          const [phase, setPhase] = useState<Phase>("idle");

            const audioRef = useRef<HTMLAudioElement | null>(null);
              const timers = useRef<number[]>([]);

                const clearTimers = () => {
                    timers.current.forEach((t) => window.clearTimeout(t));
                        timers.current = [];
                          };

                            const goNext = () => {
                                clearTimers();
                                    const a = audioRef.current;
                                        if (a) {
                                              a.pause();
                                                    a.currentTime = 0;
                                                        }
                                                            router.push("/third");
                                                              };

                                                                const showTextThenAutoAdvance = () => {
                                                                    clearTimers();
                                                                        setPhase("text");
                                                                            timers.current.push(window.setTimeout(() => goNext(), 3000));
                                                                              };

                                                                                useEffect(() => {
                                                                                    clearTimers();

                                                                                        // 1s delay → attempt audio
                                                                                            timers.current.push(
                                                                                                  window.setTimeout(async () => {
                                                                                                          setPhase("playing");

                                                                                                                  const a = audioRef.current;
                                                                                                                          if (!a) {
                                                                                                                                    timers.current.push(window.setTimeout(() => showTextThenAutoAdvance(), 1500));
                                                                                                                                              return;
                                                                                                                                                      }

                                                                                                                                                              try {
                                                                                                                                                                        a.currentTime = 0;
                                                                                                                                                                                  await a.play();
                                                                                                                                                                                          } catch {
                                                                                                                                                                                                    // autoplay blocked → fail quietly into text
                                                                                                                                                                                                              timers.current.push(window.setTimeout(() => showTextThenAutoAdvance(), 1500));
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                            }, 1000)
                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                    return () => {
                                                                                                                                                                                                                                          clearTimers();
                                                                                                                                                                                                                                                const a = audioRef.current;
                                                                                                                                                                                                                                                      if (a) {
                                                                                                                                                                                                                                                              a.pause();
                                                                                                                                                                                                                                                                      a.currentTime = 0;
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                    // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                                                                                                                                                                                                                      }, []);

                                                                                                                                                                                                                                                                                        const onEnded = () => {
                                                                                                                                                                                                                                                                                            // 1.5s after audio ends → show text → auto advance 3s later
                                                                                                                                                                                                                                                                                                clearTimers();
                                                                                                                                                                                                                                                                                                    timers.current.push(window.setTimeout(() => showTextThenAutoAdvance(), 1500));
                                                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                                                        const onTapAnywhere = () => {
                                                                                                                                                                                                                                                                                                            // tap-to-skip only during the countdown window (text visible)
                                                                                                                                                                                                                                                                                                                if (phase === "text") goNext();
                                                                                                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                                                                                                    return (
                                                                                                                                                                                                                                                                                                                        <main className="screen" onClick={onTapAnywhere}>
                                                                                                                                                                                                                                                                                                                              <section className="stack" aria-label="second transition">
                                                                                                                                                                                                                                                                                                                                      {phase === "playing" && <p className="enterLine fadeIn">• • •</p>}

                                                                                                                                                                                                                                                                                                                                              {phase === "text" && (
                                                                                                                                                                                                                                                                                                                                                        <p className="mainLine fadeIn">it existed while you were listening.</p>
                                                                                                                                                                                                                                                                                                                                                                )}

                                                                                                                                                                                                                                                                                                                                                                        <audio ref={audioRef} src={AUDIO_SRC} preload="auto" onEnded={onEnded} />
                                                                                                                                                                                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                    