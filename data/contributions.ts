
export interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

export const REAL_CONTRIBUTIONS: ContributionDay[] = [
    { "date": "2025-06-25", "count": 6, "level": 4 },
    { "date": "2025-08-14", "count": 4, "level": 3 },
    { "date": "2025-09-14", "count": 1, "level": 1 },
    { "date": "2025-09-25", "count": 2, "level": 2 },
    { "date": "2025-09-28", "count": 6, "level": 4 },
    { "date": "2025-10-15", "count": 2, "level": 2 },
    { "date": "2025-11-04", "count": 1, "level": 1 },
    { "date": "2025-11-07", "count": 1, "level": 1 },
    { "date": "2025-11-08", "count": 1, "level": 1 },
    { "date": "2025-11-11", "count": 1, "level": 1 },
    { "date": "2025-11-27", "count": 22, "level": 4 },
    { "date": "2025-11-28", "count": 30, "level": 4 },
    { "date": "2025-11-29", "count": 1, "level": 1 },
    { "date": "2025-11-30", "count": 1, "level": 1 },
    { "date": "2025-12-01", "count": 1, "level": 1 },
    { "date": "2025-12-02", "count": 5, "level": 4 },
    { "date": "2025-12-03", "count": 2, "level": 2 },
    { "date": "2025-12-04", "count": 1, "level": 1 },
    { "date": "2025-12-05", "count": 4, "level": 3 },
    { "date": "2025-12-06", "count": 3, "level": 2 },
    { "date": "2025-12-07", "count": 3, "level": 2 },
    { "date": "2025-12-08", "count": 3, "level": 2 },
    { "date": "2025-12-10", "count": 4, "level": 3 },
    { "date": "2025-12-14", "count": 4, "level": 3 },
    { "date": "2025-12-15", "count": 3, "level": 2 },
    { "date": "2025-12-16", "count": 4, "level": 3 },
    { "date": "2025-12-24", "count": 4, "level": 3 },
    { "date": "2025-12-25", "count": 2, "level": 2 },
    { "date": "2025-12-26", "count": 4, "level": 3 },
    { "date": "2025-12-27", "count": 3, "level": 2 },
    { "date": "2026-01-03", "count": 3, "level": 2 },
    { "date": "2026-01-06", "count": 3, "level": 2 },
    { "date": "2026-01-10", "count": 4, "level": 3 },
    { "date": "2026-01-11", "count": 1, "level": 1 },
    { "date": "2026-01-13", "count": 4, "level": 3 },
    { "date": "2026-01-18", "count": 1, "level": 1 },
    { "date": "2026-01-21", "count": 2, "level": 2 },
    { "date": "2026-01-22", "count": 23, "level": 4 }
];

// Helper to fill in missing days for a full year grid if needed
// This assumes the inputs are just the active days.
// The component should handle merging this with a full year of empty days.
