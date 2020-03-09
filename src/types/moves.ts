/**
 * The different types of moves
 */
export enum MoveType {
  LEAVE = 'LEAVE',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REPLACE = 'REPLACE'
}

/* Some move actions */
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

/** A union type for any move */
export type Move = LeaveMove | AddMove | RemoveMove | ReplaceMove

export type MoveListNode = {
  cost: number
  move: Move
  previous: MoveListNode
}
