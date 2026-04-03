import React from 'react';
import BlogTemplate from '../../components/BlogTemplate';
import { blogPosts } from '../../constants';

const GoalGetterBlog: React.FC = () => {
    const p = 'text-body';
    const accent = 'text-accent';
    const heading = 'section-heading';
    const divider = 'divider';

    const post = blogPosts.find((b) => b.slug === 'goalgetter')!;

    return (
        <BlogTemplate post={post}>
            <div className="space-y-4">
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
            </div>

            <div className={divider} />

            <div className="space-y-4">
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
            </div>
        </BlogTemplate>
    );
};

export default GoalGetterBlog;
