// web/lib/entitlements.ts
export type Entitlement = "free" | "premium";

const KEY_PLAN = "atln_plan_v1";
const KEY_DAY = "atln_day_v1";
const KEY_COUNTS = "atln_counts_v1";

export type QuotaKey = "record_submit" | "shuffle" | "listen_play";

export type Quotas = Record<QuotaKey, number>;

export const DEFAULT_FREE_QUOTAS: Quotas = {
  record_submit: 1,
    shuffle: 10,
      listen_play: 10,
      };

      type Counts = Record<QuotaKey, number>;

      const emptyCounts = (): Counts => ({
        record_submit: 0,
          shuffle: 0,
            listen_play: 0,
            });

            function todayKey(): string {
              const d = new Date();
                const yyyy = d.getFullYear();
                  const mm = String(d.getMonth() + 1).padStart(2, "0");
                    const dd = String(d.getDate()).padStart(2, "0");
                      return `${yyyy}-${mm}-${dd}`;
                      }

                      function loadPlan(): Entitlement {
                        if (typeof window === "undefined") return "free";
                          return (localStorage.getItem(KEY_PLAN) as Entitlement) || "free";
                          }

                          function savePlan(plan: Entitlement) {
                            localStorage.setItem(KEY_PLAN, plan);
                            }

                            function loadCounts(): Counts {
                              const raw = localStorage.getItem(KEY_COUNTS);
                                if (!raw) return emptyCounts();
                                  try {
                                      return { ...emptyCounts(), ...(JSON.parse(raw) as Partial<Counts>) };
                                        } catch {
                                            return emptyCounts();
                                              }
                                              }

                                              function saveCounts(counts: Counts) {
                                                localStorage.setItem(KEY_COUNTS, JSON.stringify(counts));
                                                }

                                                function ensureSameDay() {
                                                  if (typeof window === "undefined") return;
                                                    const t = todayKey();
                                                      const stored = localStorage.getItem(KEY_DAY);
                                                        if (stored !== t) {
                                                            localStorage.setItem(KEY_DAY, t);
                                                                saveCounts(emptyCounts());
                                                                  }
                                                                  }

                                                                  export function getEntitlement(): Entitlement {
                                                                    if (typeof window === "undefined") return "free";
                                                                      ensureSameDay();
                                                                        return loadPlan();
                                                                        }

                                                                        export function setEntitlement(plan: Entitlement) {
                                                                          if (typeof window === "undefined") return;
                                                                            savePlan(plan);
                                                                            }

                                                                            export function isPremium(): boolean {
                                                                              return getEntitlement() === "premium";
                                                                              }

                                                                              export function getUsage(): Counts {
                                                                                if (typeof window === "undefined") return emptyCounts();
                                                                                  ensureSameDay();
                                                                                    return loadCounts();
                                                                                    }

                                                                                    export function canUse(
                                                                                      key: QuotaKey,
                                                                                        freeQuotas: Quotas = DEFAULT_FREE_QUOTAS
                                                                                        ): { ok: boolean; remaining: number } {
                                                                                          if (typeof window === "undefined") return { ok: true, remaining: 999999 };
                                                                                            ensureSameDay();
                                                                                              if (isPremium()) return { ok: true, remaining: 999999 };

                                                                                                const counts = loadCounts();
                                                                                                  const used = counts[key] ?? 0;
                                                                                                    const limit = freeQuotas[key] ?? 0;
                                                                                                      const remaining = Math.max(0, limit - used);
                                                                                                        return { ok: remaining > 0, remaining };
                                                                                                        }

                                                                                                        export function consume(
                                                                                                          key: QuotaKey,
                                                                                                            freeQuotas: Quotas = DEFAULT_FREE_QUOTAS
                                                                                                            ): { ok: boolean; remaining: number } {
                                                                                                              if (typeof window === "undefined") return { ok: true, remaining: 999999 };
                                                                                                                ensureSameDay();
                                                                                                                  if (isPremium()) return { ok: true, remaining: 999999 };

                                                                                                                    const counts = loadCounts();
                                                                                                                      const used = counts[key] ?? 0;
                                                                                                                        const limit = freeQuotas[key] ?? 0;

                                                                                                                          if (used >= limit) return { ok: false, remaining: 0 };

                                                                                                                            const next = { ...counts, [key]: used + 1 } as Counts;
                                                                                                                              saveCounts(next);

                                                                                                                                const remaining = Math.max(0, limit - (used + 1));
                                                                                                                                  return { ok: true, remaining };
                                                                                                                                  }
                                                                                                                                  