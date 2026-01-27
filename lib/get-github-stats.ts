
import { ContributionDay } from "@/data/contributions";

const GITHUB_USERNAME = "Amar-77";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Fetch contributions using GitHub GraphQL API (real-time data)
 */
async function fetchContributionsViaAPI(): Promise<ContributionDay[]> {
    console.log("Fetching contributions via GitHub GraphQL API...");

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

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: { userName: GITHUB_USERNAME },
        }),
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const contributions: ContributionDay[] = [];

    // Define type explicitly to avoid implicit any errors if types aren't fully inferred
    type APIWeek = {
        contributionDays: {
            contributionCount: number;
            date: string;
            contributionLevel: string;
        }[];
    };

    for (const week of weeks as APIWeek[]) {
        for (const day of week.contributionDays) {
            let level = 0;
            switch (day.contributionLevel) {
                case "NONE": level = 0; break;
                case "FIRST_QUARTILE": level = 1; break;
                case "SECOND_QUARTILE": level = 2; break;
                case "THIRD_QUARTILE": level = 3; break;
                case "FOURTH_QUARTILE": level = 4; break;
                default: level = 0;
            }

            contributions.push({
                date: day.date,
                count: day.contributionCount,
                level: level,
            });
        }
    }

    return contributions;
}

/**
 * Fetch contributions by scraping HTML (fallback method)
 */
async function fetchContributionsViaHTML(): Promise<ContributionDay[]> {
    console.log("Fetching contributions via HTML scraping (fallback)...");

    const URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

    const response = await fetch(URL, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();

    // 1. Parse all tool-tips to map counts to IDs
    const toolTipMap = new Map<string, number>();
    const toolTipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>(.*?)<\/tool-tip>/g;
    let toolTipMatch;

    while ((toolTipMatch = toolTipRegex.exec(html)) !== null) {
        const id = toolTipMatch[1];
        const text = toolTipMatch[2];
        const countMatch = text.match(/^(\d+|No)\s+contributions?/);
        let count = 0;

        if (countMatch) {
            if (countMatch[1] !== "No") {
                count = parseInt(countMatch[1], 10);
            }
        }
        toolTipMap.set(id, count);
    }

    // 2. Parse all days and link to counts via ID
    const daysRegex = /<td[^>]+class="ContributionCalendar-day"[^>]*>/g;
    const tags = html.match(daysRegex) || [];

    if (tags.length === 0) {
        console.warn("No contribution days found. GitHub markup might have changed.");
        return [];
    }

    console.log(`Found ${tags.length} days via HTML.`);

    const contributions: ContributionDay[] = [];
    for (const tag of tags) {
        const dateMatch = tag.match(/data-date="([^"]+)"/);
        const levelMatch = tag.match(/data-level="([^"]+)"/);
        const idMatch = tag.match(/id="([^"]+)"/);

        if (dateMatch) {
            const date = dateMatch[1];
            const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;
            let count = 0;

            if (idMatch) {
                const id = idMatch[1];
                count = toolTipMap.get(id) || 0;
            }

            contributions.push({ date, count, level });
        }
    }

    contributions.sort((a, b) => a.date.localeCompare(b.date));
    return contributions;
}

export async function getGitHubStats(): Promise<ContributionDay[]> {
    try {
        if (GITHUB_TOKEN) {
            try {
                return await fetchContributionsViaAPI();
            } catch (error) {
                console.warn("GitHub API failed, falling back to HTML:", error);
                return await fetchContributionsViaHTML();
            }
        } else {
            console.warn("No GITHUB_TOKEN set, using HTML scraping fallback.");
            return await fetchContributionsViaHTML();
        }
    } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        return [];
    }
}
