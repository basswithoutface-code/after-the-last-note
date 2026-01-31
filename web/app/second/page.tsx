"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "idle" | "playing" | "text";

export default function SecondPage() {
  const router = useRouter();

    // ✅ CHANGE THIS to your exact file name in /web/public
      // Example: "/AfterTheLastNote.m4a"  (capitalization must match)
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

                                                                            // 3 seconds after text appears → auto-advance
                                                                                timers.current.push(window.setTimeout(() => goNext(), 3000));
                                                                                  };

                                                                                    useEffect(() => {
                                                                                        clearTimers();

                                                                                            // Page opens → wait 1s → attempt audio
                                                                                                timers.current.push(
                                                                                                      window.setTimeout(async () => {
                                                                                                              setPhase("playing");

                                                                                                                      const a = audioRef.current;
                                                                                                                              if (!a) {
                                                                                                                                        // No audio element? fail quietly into text
                                                                                                                                                  timers.current.push(window.setTimeout(() => showTextThenAutoAdvance(), 1500));
                                                                                                                                                            return;
                                                                                                                                                                    }

                                                                                                                                                                            try {
                                                                                                                                                                                      a.currentTime = 0;
                                                                                                                                                                                                await a.play();
                                                                                                                                                                                                          // After playback ends, onEnded handles the rest
                                                                                                                                                                                                                  } catch {
                                                                                                                                                                                                                            // Autoplay blocked (common on mobile) → fail quietly into text
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
                                                                                                                                                                                                                                                                                                                    // 1.5s after audio ends → show text → auto-advance 3s later
                                                                                                                                                                                                                                                                                                                        clearTimers();
                                                                                                                                                                                                                                                                                                                            timers.current.push(window.setTimeout(() => showTextThenAutoAdvance(), 1500));
                                                                                                                                                                                                                                                                                                                              };

                                                                                                                                                                                                                                                                                                                                const onTapAnywhere = () => {
                                                                                                                                                                                                                                                                                                                                    // Tap allowed ONLY after text appears (during that 3s window)
                                                                                                                                                                                                                                                                                                                                        if (phase === "text") goNext();
                                                                                                                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                                                                                                <main className="screen" onClick={onTapAnywhere}>
                                                                                                                                                                                                                                                                                                                                                      <section className="stack" aria-label="Second transition">
                                                                                                                                                                                                                                                                                                                                                              {/* Minimal “audio moment” marker */}
                                                                                                                                                                                                                                                                                                                                                                      {phase === "playing" && <p className="enterLine fadeIn">• • •</p>}

                                                                                                                                                                                                                                                                                                                                                                              {phase === "text" && (
                                                                                                                                                                                                                                                                                                                                                                                        <p className="mainLine fadeIn">It existed while you were listening.</p>
                                                                                                                                                                                                                                                                                                                                                                                                )}

                                                                                                                                                                                                                                                                                                                                                                                                        <audio ref={audioRef} src={AUDIO_SRC} preload="auto" onEnded={onEnded} />
                                                                                                                                                                                                                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                    