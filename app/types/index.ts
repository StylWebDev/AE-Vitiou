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
