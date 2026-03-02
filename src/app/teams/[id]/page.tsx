import { getMatches, getTeamByName } from "@/lib/fetchData";
import { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const matches = await getMatches();

  const teamNames = new Set<string>();

  matches.forEach((match) => {
    if (match.strHomeTeam) teamNames.add(match.strHomeTeam);
    if (match.strAwayTeam) teamNames.add(match.strAwayTeam);
  });

  return Array.from(teamNames)
    .slice(0, 5)
    .map((name) => ({
      id: encodeURIComponent(name),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const teamName = decodeURIComponent(id);
  const team = await getTeamByName(teamName);

  if (!team) {
    return {
      title: "Team Not Found",
      description: "The requested team could not be found.",
    };
  }

  return {
    title: `${team.strTeam} | Team Details`,
    description: team.strDescriptionEN?.slice(0, 160) || "",
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const teamName = decodeURIComponent(id);
  const team = await getTeamByName(teamName);

  if (!team) return <div>Team not found</div>;

  return (
    <div>
      <h1>{team.strTeam}</h1>
      <h2>{team.strStadium}</h2>
      <p>{team.strDescriptionEN}</p>
    </div>
  );
}
