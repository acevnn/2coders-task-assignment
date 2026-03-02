import Link from "next/link";
import { Match } from "@/lib/types";

type Props = {
  upcoming: Match[];
};

export default function UpcomingMatches({ upcoming }: Props) {
  return (
    <section>
      <h2>Upcoming Matches</h2>

      {upcoming.map((match: Match) => (
        <div key={match.idEvent} style={{ marginBottom: "16px" }}>
          <strong>
            <Link href={`/teams/${encodeURIComponent(match.strHomeTeam)}`}>
              {match.strHomeTeam}
            </Link>{" "}
            vs{" "}
            <Link href={`/teams/${encodeURIComponent(match.strAwayTeam)}`}>
              {match.strAwayTeam}
            </Link>
          </strong>

          <div>
            {match.dateEvent} — {match.strTime}
          </div>
          <div>{match.strLeague}</div>
        </div>
      ))}
    </section>
  );
}
