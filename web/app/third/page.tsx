"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2 | 3;

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

                                                    // 1s → who are you
                                                        timers.current.push(window.setTimeout(() => setStage(1), 1000));

                                                            // +1.5s → tell me
                                                                timers.current.push(window.setTimeout(() => setStage(2), 2500));

                                                                    // +3s → stay quiet.
                                                                        timers.current.push(window.setTimeout(() => setStage(3), 5500));

                                                                            // +6s after stay quiet appears → auto to listening (5500 + 6000 = 11500)
                                                                                timers.current.push(window.setTimeout(() => goListening(), 11500));

                                                                                    return () => clearTimers();
                                                                                        // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                          }, []);

                                                                                            const onTapAnywhere = () => {
                                                                                                // user can tap anywhere after "stay quiet." appears
                                                                                                    if (stage >= 3) goListening();
                                                                                                      };

                                                                                                        return (
                                                                                                            <main className="screen" onClick={onTapAnywhere}>
                                                                                                                  <section className="stack" aria-label="third transition">
                                                                                                                          {stage >= 1 && <p className={`mainLine ${stage === 1 ? "fadeIn" : ""}`}>who are you</p>}

                                                                                                                                  {stage >= 2 && (
                                                                                                                                            <button
                                                                                                                                                        className={`${stage === 2 ? "fadeIn" : ""}`}
                                                                                                                                                                    style={btnStyle(true)}
                                                                                                                                                                                onClick={(e) => {
                                                                                                                                                                                              e.stopPropagation();
                                                                                                                                                                                                            goRecord();
                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                              tell me
                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                )}

                                                                                                                                                                                                                                                                        {stage >= 3 && (
                                                                                                                                                                                                                                                                                  <p className={`enterLine ${stage === 3 ? "fadeIn" : ""}`} style={{ marginTop: 18 }}>
                                                                                                                                                                                                                                                                                              stay quiet.
                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                            function btnStyle(enabled: boolean): React.CSSProperties {
                                                                                                                                                                                                                                                                                                                              return {
                                                                                                                                                                                                                                                                                                                                  background: "transparent",
                                                                                                                                                                                                                                                                                                                                      border: "1px solid rgba(235,235,235,0.35)",
                                                                                                                                                                                                                                                                                                                                          color: enabled ? "rgba(235,235,235,0.75)" : "rgba(235,235,235,0.30)",
                                                                                                                                                                                                                                                                                                                                              padding: "12px 18px",
                                                                                                                                                                                                                                                                                                                                                  borderRadius: 999,
                                                                                                                                                                                                                                                                                                                                                      fontSize: 16,
                                                                                                                                                                                                                                                                                                                                                          letterSpacing: "0.08em",
                                                                                                                                                                                                                                                                                                                                                              cursor: enabled ? "pointer" : "not-allowed",
                                                                                                                                                                                                                                                                                                                                                                  opacity: enabled ? 1 : 0.6,
                                                                                                                                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                    