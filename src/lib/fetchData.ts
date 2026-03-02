import { Match, Team } from "@/lib/types";

const API = "https://www.thesportsdb.com/api/v1/json/123";
const leagueIds = ["4328", "4331", "4332", "4335"];

interface LeagueResponse {
  events: Match[] | null;
}

interface TeamResponse {
  teams: Team[] | null;
}

export async function getMatches(): Promise<Match[]> {
  const responses = await Promise.all(
    leagueIds.map((id) =>
      fetch(`${API}/eventsnextleague.php?id=${id}`, {
        next: { revalidate: 300 },
      }),
    ),
  );

  responses.forEach((res) => {
    if (!res.ok) throw new Error("Failed to fetch matches");
  });

  const data: LeagueResponse[] = await Promise.all(
    responses.map((res) => res.json()),
  );

  const matches = data.flatMap((league) => league.events ?? []);

  return matches.sort(
    (a: Match, b: Match) =>
      new Date(a.dateEvent).getTime() - new Date(b.dateEvent).getTime(),
  );
}

export async function getTeamByName(name: string): Promise<Team | null> {
  const res = await fetch(
    `${API}/searchteams.php?t=${encodeURIComponent(name)}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error("Failed to fetch team");

  const data: TeamResponse = await res.json();

  return data.teams?.[0] ?? null;
}

export async function getLiveMatches(): Promise<Match[]> {
  const res = await fetch(`${API}/livescore.php?s=Soccer`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch live matches");

  const data: LeagueResponse = await res.json();

  return data.events ?? [];
}
