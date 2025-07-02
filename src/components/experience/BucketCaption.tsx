// BucketCaption.tsx
import { useState } from "react";

/** Minimal prop typing to silence TS errors */
type BucketCaptionProps = {
  calendarMonth: Date;                // ← new name
  onMonthChange: (month: Date) => void;
  displayIndex: number;               // still provided
} & React.HTMLAttributes<HTMLDivElement>;

export function BucketCaption({
  calendarMonth,
  onMonthChange,
}: BucketCaptionProps) {
  const currentYear = calendarMonth.getFullYear();
  const [expanded, setExpanded] = useState<[number, number] | null>(null);

  /* five‑year buckets */
  const buckets: Array<[number, number]> = [];
  for (let y = 2000; y <= new Date().getFullYear(); y += 5) {
    buckets.push([y, y + 4]);
  }

  /* --- bucket view --- */
  if (!expanded) {
    return (
      <div className="flex flex-wrap gap-1 p-1 text-sm justify-center">
        {buckets.map(([start, end]) => (
          <button
            key={start}
            className="rounded px-2 py-1 hover:bg-accent transition"
            onClick={() => setExpanded([start, end])}
          >
            {start}–{end}
          </button>
        ))}
      </div>
    );
  }

  /* --- year view --- */
  const [start, end] = expanded;
  return (
    <div className="flex flex-wrap gap-1 p-1 text-sm justify-center">
      <button
        onClick={() => setExpanded(null)}
        className="rounded px-2 py-1 font-semibold hover:underline text-muted-foreground"
      >
        ← ranges
      </button>

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
        (year) => (
          <button
            key={year}
            className={`rounded px-2 py-1 ${
              year === currentYear
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
            onClick={() => {
              onMonthChange(new Date(year, calendarMonth.getMonth()));
              setExpanded(null);
            }}
          >
            {year}
          </button>
        )
      )}
    </div>
  );
}
