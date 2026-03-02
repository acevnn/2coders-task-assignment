"use client";

import { useEffect, useState } from "react";
import { Match } from "@/lib/types";
import styles from "./page.module.scss";

interface LeagueResponse {
  events: Match[] | null;
}

const LEAGUE_IDS = ["4328", "4331", "4332", "4335"];

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchRecent() {
    try {
      setError(null);

      const responses = await Promise.all(
        LEAGUE_IDS.map((id) =>
          fetch(
            `https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=${id}`,
            { cache: "no-store" },
          ),
        ),
      );

      responses.forEach((res) => {
        if (!res.ok) throw new Error("Network error");
      });

      const data: LeagueResponse[] = await Promise.all(
        responses.map((res) => res.json()),
      );

      const allMatches = data.flatMap((league) => league.events ?? []);
      console.log(allMatches);
      setMatches(allMatches.slice(0, 10));

      setLastUpdated(new Date());
    } catch (err: unknown) {
      setError("Failed to load recent matches");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecent();

    const interval = setInterval(fetchRecent, 30000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = lastUpdated?.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <main>
      <section className={styles["live"]}>
        <div>
          <h1>Live / Recent Scores</h1>
          <p className={styles["live__refresh"]}>
            Auto-refreshing every 30 seconds
          </p>
          {formattedTime && (
            <p className={styles["live__last-updated"]}>
              Last updated: {formattedTime}
            </p>
          )}
        </div>

        {loading && <p>Loading matches...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && matches.length === 0 && (
          <p>No recent matches available</p>
        )}

        <div className={styles["live__matches-wrapper"]}>
          {!loading &&
            !error &&
            matches.map((match) => (
              <div key={match.idEvent}>
                <strong>
                  {match.strHomeTeam} {match.intHomeScore} :{" "}
                  {match.intAwayScore} {match.strAwayTeam}
                </strong>
                <div>{match.strLeague}</div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
