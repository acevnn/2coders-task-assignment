import { getMatches } from "@/lib/fetchData";
import FeaturedMatch from "@/components/FeaturedMatch/FeaturedMatch";
import UpcomingMatches from "@/components/UpcomingMatches/UpcomingMatches";

export const revalidate = 300;

export default async function Home() {
  const matches = await getMatches();

  if (!matches.length) {
    return <div>No matches available</div>;
  }

  const featured = matches[0];
  const upcoming = matches.slice(1, 8);

  return (
    <main>
      <FeaturedMatch match={featured} />
      <UpcomingMatches upcoming={upcoming} />
    </main>
  );
}
