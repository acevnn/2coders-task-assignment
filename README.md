Football Hub — Next.js 16 App Router

## Getting Started

First make sure to have Node.js 18+ installed.

Install dependencies:
npm install

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The project is buult with Next.js 16+ using App Router, leveraging modern rendering strategies and metadata handling.

Rendering strategies

1. Homepage, ISR.

- Homepage uses Incremental Static Generation (ISR):
- export const revalidate = 300;

Upcoming matches do not require real-time updates while static HTML improves SEO and performance.
Revalidating every 5 minutess gives freshness with API rate limits (free tier).

2. Team Detail Page, SSG + Dynamic Fallback.

- generateStaticParams() to pre-render at least 5 teams at build time.
- generateMetadata() for dynamic SEO metadata.

Pre-rendering improves performance and SEO, while dynamic fall back ensures scalability.

Due to limitations of the free API tier, routing is based on team names instead of IDs.
In a production environment, ID-based routing would be preferred.

3. live page is client-side rendering

- 'use client'
  The /live page implements poling every 30 seconds, loading and error states and timestamp of the last refresh. This is
  required because of the live data that needs frequent updates.
  SEO not really critical for live scores.

The project follows app router best practies.

Server components by default, client components only where required, TypeScript typing.

The sportDB free tier has limited and incosistent endpoints, which lead me to built with some workarounds, multiple ID's
were combined to increase available data.
In a production scenario, a paid API or different provider would allow ID-based routing and full static generation.

What I would improve with more time:
Add a dedicated global error boundary, add pagination for match list or infinite scroll feature, implement ID-based
routing with a more reliable data source.
Improve UI/UX styling and responsivness, introduce a caching strategy and also implement state management libraries.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Inter].

