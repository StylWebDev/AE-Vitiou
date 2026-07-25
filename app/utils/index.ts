export function exists(type: unknown): type is NonNullable<typeof type> {
  return type !== null && type !== undefined;
}

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as HTTPMethods

export const positions = {
  GK: 'Τερματοφύλακας',
  DEF: "Αμυντικός",
  MID: 'Κέντρο',
  EXT: "Εξτρέμ",
  FWD: "Επιθετικός"
} as const

export const PosColor = {
  GK: 'warning',
  DEF: 'info',
  EXT: 'secondary',
  MID: 'success',
  FWD: 'primary'
} as const
