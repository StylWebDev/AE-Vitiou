export type BoolInt = 0 | 1

export interface ApiResponse<T> {
  status: number
  response: T
}

export interface HTTPMethods {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
  PATCH: 'PATCH'
}

export interface Player {
  id: number;
  name: string;
  number: number;
  pos: 'GK' | 'DEF' | 'MID' | 'EXT' | 'FWD';
  isCaptain: BoolInt;
  createdAt: string;
}

export interface Match {
  id: number;
  status: 'final' | 'pending' | 'live';
  competition: 'championship' | 'cup';
  home: string;
  away: string;
  hs: number;
  points: number;
  as: number;
  date: number;
  isTrophy: boolean;
  createdAt: Date;
}

export interface Stats {
  "totalGoals": number;
  "avgGoals": number;
  "wins": number;
  "totalMatches": number;
  "points": number;
  "titles": number;
  "topScoredMatches": Match[];
  "lastMatches": Match[];
  "topScorers": Player[] ;
}
