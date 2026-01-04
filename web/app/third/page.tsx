"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2 | 3;

export default function ThirdPage() {
  const router = useRouter();

    const [stage, setStage] = useState<Stage>(0);
      const timers = useRef<number[]>([]);

        const BEAT = 1000;
          const GAP_1 = 1500; // question -> button
            const GAP_2 = 3000; // button -> stay quiet
              const AUTO_AFTER_STAY = 6000;

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

                                                            timers.current.push(window.setTimeout(() => setStage(1), BEAT));
                                                                timers.current.push(window.setTimeout(() => setStage(2), BEAT + GAP_1));
                                                                    timers.current.push(
                                                                          window.setTimeout(() => setStage(3), BEAT + GAP_1 + GAP_2)
                                                                              );
                                                                                  timers.current.push(
                                                                                        window.setTimeout(
                                                                                                () => goListening(),
                                                                                                        BEAT + GAP_1 + GAP_2 + AUTO_AFTER_STAY
                                                                                                              )
                                                                                                                  );

                                                                                                                      return () => clearTimers();
                                                                                                                          // eslint-disable-next-line react-hooks/exhaustive-deps
                                                                                                                            }, []);

                                                                                                                              const onTapAnywhere = () => {
                                                                                                                                  if (stage === 3) goListening();
                                                                                                                                    };

                                                                                                                                      return (
                                                                                                                                          <main className="screen" onClick={onTapAnywhere}>
                                                                                                                                                <section className="stack" aria-label="Identity choice">
                                                                                                                                                        {stage >= 1 && (
                                                                                                                                                                  <p className={`mainLine ${stage === 1 ? "fadeIn" : ""}`}>
                                                                                                                                                                              Who are you
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
                                                                                                                                                                                                                                                                                                                        padding: "12px 18px",
                                                                                                                                                                                                                                                                                                                                        fontSize: 18,
                                                                                                                                                                                                                                                                                                                                                        letterSpacing: "0.08em",
                                                                                                                                                                                                                                                                                                                                                                        cursor: "pointer",
                                                                                                                                                                                                                                                                                                                                                                                        borderRadius: 999,
                                                                                                                                                                                                                                                                                                                                                                                                        border: "1px solid rgba(235,235,235,0.35)",
                                                                                                                                                                                                                                                                                                                                                                                                                        color: "rgba(235,235,235,0.75)",
                                                                                                                                                                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                    className={stage === 2 ? "fadeIn" : ""}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  aria-label="Tell me"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Tell me
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {stage >= 3 && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p className="enterLine fadeIn" style={{ marginTop: 26 }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Stay quiet
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      