export async function getSportData() {
  const responses = await Promise.all([
    fetch(
      "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328",
      { next: { revalidate: 300 } },
    ),

    fetch(
      "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4331",
      { next: { revalidate: 300 } },
    ),
    fetch(
      "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4332",
      { next: { revalidate: 300 } },
    ),
    fetch(
      "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4335",
      { next: { revalidate: 300 } },
    ),
  ]);

  responses.forEach((res) => {
    if (!res.ok) throw new Error("error");
  });

  const data = await Promise.all(responses.map((res) => res.json()));

  return data.flatMap((league) => league.events ?? []);
}

export async function getSportLeague() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/123/all_leagues.php",
  );

  if (!res.ok) throw new Error("Error");

  return res.json();
}

export async function getUpcomingMatches() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328",
  );

  if (!res.ok) throw new Error("error");

  return res.json();
}
