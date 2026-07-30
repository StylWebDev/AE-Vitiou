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

export const Formation = {
  S433: 'S433',
  S343: 'S343',
  S442: 'S442',
  S352: 'S352',
  S451: 'S451',
  S3421: 'S3421',
  S4231: 'S4231'
} as const

export interface Player {
  id: number;
  name: string;
  number: number;
  pos: 'GK' | 'DEF' | 'MID' | 'EXT' | 'FWD';
  isCaptain: boolean;
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

export interface Goal {
  playerId: number;
  matchId: number;
  ga: number;
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
  "lastMatch": Match;
  "topScorers": Player[] ;
}

export interface Post {
  id: number;
  img: PostImg;
  date: string;
  title: string;
  description: string;
  link: string;
}

export interface PostImg {
  type: string;
  data: number[];
}

export interface FormationResponse {
  formation?: FormationType;
  players?: string;
}

export type FormationType = 'S433' | 'S343' | 'S442' | 'S352' | 'S451' | 'S3421' | 'S4231'
