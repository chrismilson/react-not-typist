export enum MoveType {
  LEAVE = 'LEAVE',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REPLACE = 'REPLACE'
}

export interface LeaveMove {
  type: typeof MoveType.LEAVE
}

export interface AddMove {
  type: typeof MoveType.ADD
  char: string
}

export interface RemoveMove {
  type: typeof MoveType.REMOVE
}

export interface ReplaceMove {
  type: typeof MoveType.REPLACE
  char: string
}

export type Move = LeaveMove | AddMove | RemoveMove | ReplaceMove
