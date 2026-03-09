import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import BlogTemplate from '../../components/BlogTemplate';
import { blogPosts } from '../../constants';

const GoalGetterBlog: React.FC = () => {
    const { theme } = useTheme();

    const p = 'text-body';
    const accent = 'text-accent';
    const heading = 'section-heading';
    const subheading = 'section-subheading';
    const divider = 'divider-lg';

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const post = blogPosts.find((b) => b.slug === 'goalgetter')!;

    return (
        <BlogTemplate post={post}>
            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Why I Built This</h2>
                <p className={p}>
                    Every productivity app I've used is either too simple (Apple Reminders) or too
                    complex (Notion). I wanted something in between: a clean, opinionated task
                    manager with a built-in calendar that doesn't require a 30-minute onboarding
                    tutorial.
                </p>
                <p className={p}>
                    More importantly, I wanted to build something that people would actually use.
                    Not a portfolio demo, not a toy — a real product with real users who would get
                    annoyed if it went down. That constraint changes everything about how you build.{' '}
                    <span className={accent}>
                        When someone depends on your app to plan their actual day, you can't ship
                        half-baked features.
                    </span>
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>The Stack and Why</h2>
                <p className={p}>
                    <span className={accent}>Next.js + TypeScript + Tailwind + PostgreSQL</span>,
                    deployed on AWS EC2 with Route 53. Pretty standard, and that's intentional. I
                    didn't want to fight my tools — I wanted to fight the actual hard problems:
                    scheduling logic, authentication, and performance at scale.
                </p>
                <p className={p}>
                    Next.js gave me SSR and API routes in one place, which simplified deployment and
                    eliminated the coordination cost between a separate frontend and backend.
                    TypeScript caught entire categories of bugs before they shipped. PostgreSQL
                    because relational data with proper foreign keys is exactly what a task/calendar
                    app needs — no NoSQL "flexibility" that turns into a consistency nightmare at 3
                    AM.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Authentication Done Right</h2>
                <p className={subheading}>The hardest "boring" problem in web dev</p>
                <p className={p}>
                    I spent more time on auth than on any other feature. Not because it's
                    interesting — it's the opposite. But getting it wrong is catastrophic, and
                    getting it "mostly right" is the same as getting it wrong.
                </p>
                <p className={p}>
                    The implementation: NextAuth.js for session management, OAuth 2.0 for social
                    logins, bcrypt for password hashing, SHA-256 for email verification tokens, and
                    reCAPTCHA v3 for bot protection. Every credential is hashed before it touches
                    the database. Every session is tokenized and expires.
                </p>
                <p className={p}>
                    The result:{' '}
                    <span className={accent}>95%+ reduction in unauthorized access</span> compared
                    to a baseline with just email/password. That number isn't theoretical — I tested
                    it with automated attack scripts that tried credential stuffing, brute force,
                    and session hijacking.
                </p>
                <p className={p}>
                    Biggest lesson here:{' '}
                    <span className={accent}>
                        security is not a feature you add, it's a constraint you design around.
                    </span>{' '}
                    Every API route, every data mutation, every session check has to assume the user
                    is potentially malicious. It's paranoid, but that's the job.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>The Scheduling Engine</h2>
                <p className={p}>
                    Calendars look simple until you implement one. Recurring events are where the
                    complexity explodes: "every third Tuesday except holidays, ending after 12
                    occurrences." Handling all the edge cases in recurrence expansion is genuinely
                    one of the hardest problems I've worked on.
                </p>
                <p className={p}>
                    I built a <span className={accent}>cached recurrence expansion engine</span>{' '}
                    that precomputes event instances for the visible date range and caches them.
                    When the user navigates to a new week, we check the cache first and only
                    recompute if the range changed. State calculations (overdue, upcoming,
                    completed) are done lazily on render, not eagerly on every mutation.
                </p>
                <p className={p}>
                    The result was a{' '}
                    <span className={accent}>60% improvement in processing speed</span> for
                    event-heavy weeks. Without caching, a user with 50+ recurring events would see
                    visible lag when switching weeks. With it, the navigation is instant.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>The Real Users Test</h2>
                <p className={p}>
                    Getting 30+ people to use your app isn't the hard part. Getting them to{' '}
                    <em>keep</em> using it is. The first week after I shared the link, I got a flood
                    of feedback that was part humbling, part validating:
                </p>
                <ul className="space-y-2 ml-1">
                    {[
                        '"The calendar is really fast" — the caching was worth the effort.',
                        '"Can you add drag and drop?" — yes, eventually.',
                        '"It crashed when I had 200 tasks" — yeah, fixed that afternoon.',
                        '"I use this every day now" — that one made the whole project worth it.',
                    ].map((quote, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span
                                className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                            />
                            <span
                                className={`text-sm lg:text-base leading-relaxed italic ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                            >
                                {quote}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={p}>
                    Having real users changed how I prioritize work. You stop building features
                    because they're technically interesting and start building them because someone
                    asked. Product thinking is a different skill from engineering, and GoalGetter is
                    where I started learning it.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>AWS Deployment</h2>
                <p className={p}>
                    I deployed GoalGetter on AWS EC2 with Route 53 for DNS, not because it's the
                    easiest option (Vercel would've been simpler) but because I wanted to understand
                    the infrastructure layer. Setting up the instance, configuring nginx as a
                    reverse proxy, managing SSL certificates, and automating deployments taught me
                    more about production infrastructure than any tutorial.
                </p>
                <p className={p}>
                    The trade-off is real, though: more control means more responsibility. When the
                    server had a memory spike at 11 PM because of an unoptimized query, <em>I</em>{' '}
                    was the one who got the alert. No managed platform magic to save you. That's the
                    deal, and I'd make it again.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>What GoalGetter Taught Me</h2>
                <ul className="space-y-3 ml-1">
                    {[
                        {
                            bold: 'Ship to real people as early as possible.',
                            text: 'The feedback you get from actual users is worth more than a month of solo refinement. Your assumptions about what matters are almost always wrong.',
                        },
                        {
                            bold: 'Auth is a design constraint, not a checkbox.',
                            text: "Building auth correctly from the start saved me from every major security issue. Bolting it on later would've been 10x harder.",
                        },
                        {
                            bold: 'Performance is a feature.',
                            text: 'Users don\'t say "the caching layer is impressive." They say "it\'s fast." That\'s the goal. Nobody cares how — they care that it works.',
                        },
                        {
                            bold: 'Own the full stack.',
                            text: 'Building everything end-to-end — frontend, API, database, auth, infra — gave me the ability to debug anything. When something breaks, I know where to look.',
                        },
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span
                                className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                            />
                            <span
                                className={`text-sm lg:text-base leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                            >
                                <span className={accent}>{item.bold}</span> {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={`${p} mt-4 italic`}>
                    GoalGetter is the project that turned me from "someone who builds projects" into
                    "someone who ships products." The difference is accountability — and that
                    changes everything about how you write code.
                </p>
            </motion.div>
        </BlogTemplate>
    );
};

export default GoalGetterBlog;
