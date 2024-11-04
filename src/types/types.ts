export interface Match {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  competition: string;
}

export interface Referee {
  id: string;
  name: string;
  matches: Match[];
}