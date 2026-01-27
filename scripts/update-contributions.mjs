import fs from 'fs';
import path from 'path';

// GitHub username
const GITHUB_USERNAME = 'Amar-77';

// GitHub Personal Access Token (optional - falls back to HTML scraping if not provided)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Output path
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'contributions.ts');

/**
 * Fetch contributions using GitHub GraphQL API (real-time data)
 */
async function fetchContributionsViaAPI() {
    console.log('Fetching contributions via GitHub GraphQL API...');

    const query = `
        query($userName: String!) {
            user(login: $userName) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                contributionLevel
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { userName: GITHUB_USERNAME }
        })
    });

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributions = [];

    for (const week of weeks) {
        for (const day of week.contributionDays) {
            contributions.push({
                date: day.date,
                count: day.contributionCount,
                level: day.contributionLevel === 'NONE' ? 0 :
                    day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                        day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                            day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4
            });
        }
    }

    return contributions;
}

/**
 * Fetch contributions by scraping HTML (fallback method with cached data)
 */
async function fetchContributionsViaHTML() {
    console.log('Fetching contributions via HTML scraping (cached data)...');

    const URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const tags = html.match(/<(td|rect)[^>]+class="ContributionCalendar-day"[^>]*>/g) || [];

    if (tags.length === 0) {
        console.warn('No contribution days found. GitHub markup might have changed.');
        return [];
    }

    console.log(`Found ${tags.length} days.`);

    const contributions = [];
    for (const tag of tags) {
        const dateMatch = tag.match(/data-date="([^"]+)"/);
        const levelMatch = tag.match(/data-level="([^"]+)"/);
        const contentMatch = tag.match(/aria-label="(\d+|No)\s+contributions?/);

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

            contributions.push({ date, count, level });
        }
    }

    contributions.sort((a, b) => a.date.localeCompare(b.date));
    return contributions;
}

/**
 * Main function to fetch and save contributions
 */
async function fetchContributions() {
    console.log(`Fetching GitHub contributions for ${GITHUB_USERNAME}...`);

    try {
        let contributions;

        // Try API first if token is available, otherwise fall back to HTML
        if (GITHUB_TOKEN) {
            try {
                contributions = await fetchContributionsViaAPI();
                console.log('✓ Successfully fetched real-time data via GitHub API');
            } catch (apiError) {
                console.warn('API fetch failed, falling back to HTML scraping:', apiError.message);
                contributions = await fetchContributionsViaHTML();
            }
        } else {
            console.log('⚠ No GITHUB_TOKEN found - using HTML scraping (may have 12-24h delay)');
            console.log('  To get real-time data, set GITHUB_TOKEN environment variable');
            contributions = await fetchContributionsViaHTML();
        }

        const fileContent = `
export interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

export const REAL_CONTRIBUTIONS: ContributionDay[] = ${JSON.stringify(contributions, null, 4)};
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent.trim());
        console.log(`✓ Successfully wrote ${contributions.length} days to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error fetching contributions:', error);
        process.exit(1);
    }
}

fetchContributions();
