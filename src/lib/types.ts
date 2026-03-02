export interface Match {
  idEvent: string;

  strHomeTeam: string;
  strAwayTeam: string;

  strHomeTeamBadge: string;
  strAwayTeamBadge: string;

  intHomeScore?: string | null;
  intAwayScore?: string | null;

  dateEvent: string;
  strTime: string;

  strLeague: string;
}

export interface Team {
  idTeam: string;

  strTeam: string;
  strTeamBadge: string;

  strStadium: string | null;
  strDescriptionEN: string | null;

  strLeague?: string | null;
  strCountry?: string | null;
  intFormedYear?: string | null;
}
