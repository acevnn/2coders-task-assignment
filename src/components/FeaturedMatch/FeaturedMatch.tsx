import styles from "./FeaturedMatch.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Match } from "@/lib/types";

type Props = {
  match: Match;
};

export default function FeaturedMatch({ match }: Props) {
  console.log(match.strHomeTeam);

  return (
    <section className={styles["featured-match"]}>
      <h1>Featured Match</h1>
      <div className={styles["featured-match__wrapper"]}>
        <Link
          className={styles["featured-match__link"]}
          href={`/teams/${encodeURIComponent(match.strHomeTeam)}`}
        >
          <div className={styles["featured-match__badge-wrapper"]}>
            <Image
              className={styles["featured-match__badge-image"]}
              src={match.strHomeTeamBadge}
              alt={match.strHomeTeam}
              fill
              sizes={"64px"}
            />
          </div>
          <h2>{match.strHomeTeam}</h2>
        </Link>{" "}
        vs{" "}
        <Link
          className={styles["featured-match__link"]}
          href={`/teams/${encodeURIComponent(match.strAwayTeam)}`}
        >
          <h2>{match.strAwayTeam}</h2>
          <div className={styles["featured-match__badge-wrapper"]}>
            <Image
              className={styles["featured-match__badge-image"]}
              src={match.strAwayTeamBadge}
              alt={match.strAwayTeam}
              fill
              sizes={"64px"}
            />
          </div>
        </Link>
      </div>
      <p>
        {match.dateEvent} — {match.strTime}
      </p>

      <p>{match.strLeague}</p>
    </section>
  );
}
