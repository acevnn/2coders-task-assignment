import styles from "./page.module.css";
import { getSportData } from "@/lib/fetchData";

export default async function Home() {
  const events = await getSportData();
  const featuredMatch = events[0].strEvent;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/*<pre>{JSON.stringify(events, null, 2)}</pre>*/}
        <h1>{featuredMatch}</h1>
        {events.map((team: any) => (
          <h3 key={team.idEvent}>{team.strEvent}</h3>
        ))}
      </main>
    </div>
  );
}
