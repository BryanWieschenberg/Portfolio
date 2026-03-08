export function normalizeTitle(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

export const monthMap: Record<string, number> = {
    jan: 0,
    'jan.': 0,
    january: 0,
    feb: 1,
    'feb.': 1,
    february: 1,
    mar: 2,
    'mar.': 2,
    march: 2,
    apr: 3,
    'apr.': 3,
    april: 3,
    may: 4,
    jun: 5,
    'jun.': 5,
    june: 5,
    jul: 6,
    'jul.': 6,
    july: 6,
    aug: 7,
    'aug.': 7,
    august: 7,
    sep: 8,
    'sep.': 8,
    sept: 8,
    september: 8,
    oct: 9,
    'oct.': 9,
    october: 9,
    nov: 10,
    'nov.': 10,
    november: 10,
    dec: 11,
    'dec.': 11,
    december: 11,
};

export function computeSpan(dateStr: string): string | null {
    if (!dateStr.toLowerCase().includes('present')) {
        return null;
    }

    const startPart = dateStr.split('-')[0].trim();
    const tokens = startPart.split(/\s+/);

    if (tokens.length < 2) {
        return null;
    }

    const monthToken = tokens[0].toLowerCase();
    const yearToken = parseInt(tokens[1], 10);
    const month = monthMap[monthToken];

    if (month === undefined || isNaN(yearToken)) {
        return null;
    }

    const start = new Date(yearToken, month, 1);
    const now = new Date();

    let totalMonths =
        (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

    if (totalMonths < 1) {
        totalMonths = 1;
    }
    if (totalMonths < 12) {
        return `~${totalMonths} month${totalMonths === 1 ? '' : 's'}`;
    }

    const years = Math.floor(totalMonths / 12);
    const remaining = totalMonths % 12;

    if (remaining === 0) {
        return `~${years} year${years === 1 ? '' : 's'}`;
    }

    return `~${years} year${years === 1 ? '' : 's'}, ${remaining} month${remaining === 1 ? '' : 's'}`;
}

export function getSkillIconPath(skill: string, theme: string): string {
    const normalized = normalizeTitle(skill);
    return `/skills/${normalized}_${theme}.png`;
}

export function getSkillIconFallback(skill: string): string {
    return `/skills/${normalizeTitle(skill)}.png`;
}

export function getAge() {
    const birthDate = new Date('2004-01-29');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
