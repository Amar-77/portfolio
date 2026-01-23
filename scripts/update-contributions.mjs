import fs from 'fs';
import path from 'path';

// Target URL
const URL = 'https://github.com/users/Amar-77/contributions';

// Output path
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'contributions.ts');

async function fetchContributions() {
    console.log('Fetching GitHub contributions for Amar-77...');

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const html = await response.text();

        // Regex to extract data
        // Looks for <td ... data-date="2024-01-01" data-level="2" ... > ... <span class="sr-only">11 contributions...</span>
        // Or simpler: match the data-date and data-level attributes, and try to find the count.
        // GitHub's structure changes slightly, but data-date and data-level are usually stable on the td/rect.
        // Recently it's: <td tabindex="-1" class="ContributionCalendar-day" data-date="2025-01-21" data-level="2" aria-labelledby="...">

        // Let's use a regex that captures all "ContributionCalendar-day" elements' attributes
        const dayRegex = /data-date="([^"]+)"\s+data-level="([^"]+)"/g;

        const contributions = [];
        let match;

        // We also need to map counts roughly. 
        // GitHub doesn't always put the exact count in an easily regex-able attribute (it's in a tooltip or aria-label linked by ID).
        // However, for the "Proof of Work" visual, the LEVEL (0-4) is the most important part for the visuals.
        // The exact count is used for the tooltip.
        // We can try to extract the count from the aria-label if present, or tool-tip.
        // The aria-label usually is on the element itself: aria-label="5 contributions on January 21st"
        const fullRegex = /aria-label="(\d+|No) contributions? on [^"]+"\s+data-date="([^"]+)"\s+data-level="([^"]+)"/g;

        // Alternative: First find all days, then extract.
        // Let's use a simpler approach that matches the pattern generally found in the source.

        // Pattern: <td ... data-date="YYYY-MM-DD" data-level="X" ... aria-label="N contributions ...">
        const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*aria-label="(\d+|No) contributions?/g;

        // Note: The order of attributes in HTML string might vary.
        // Let's rely on finding `data-date` and `data-level` and `aria-label` in the same tag.

        // Better approach: Split by <td or <rect
        const tags = html.match(/<(td|rect)[^>]+class="ContributionCalendar-day"[^>]*>/g) || [];

        if (tags.length === 0) {
            console.warn('No contribution days found. GitHub markup might have changed.');
            return;
        }

        console.log(`Found ${tags.length} days.`);

        for (const tag of tags) {
            const dateMatch = tag.match(/data-date="([^"]+)"/);
            const levelMatch = tag.match(/data-level="([^"]+)"/);
            const contentMatch = tag.match(/aria-label="(\d+|No)\s+contributions?/); // "No" or "5"

            if (dateMatch) {
                const date = dateMatch[1];
                const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;
                let count = 0;

                if (contentMatch) {
                    if (contentMatch[1] === 'No') {
                        count = 0;
                    } else {
                        count = parseInt(contentMatch[1], 10);
                    }
                }

                // Only add if we have valid data
                contributions.push({ date, count, level });
            }
        }

        // Sort by date just in case
        contributions.sort((a, b) => a.date.localeCompare(b.date));

        // Filter to last 365 days mostly handled by what GitHub returns (usually one year)

        const fileContent = `
export interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

export const REAL_CONTRIBUTIONS: ContributionDay[] = ${JSON.stringify(contributions, null, 4)};
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent.trim());
        console.log(`Successfully wrote ${contributions.length} days to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error fetching contributions:', error);
        process.exit(1);
    }
}

fetchContributions();
