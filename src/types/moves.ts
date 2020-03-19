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
export class LeaveMove {
  type = MoveType.LEAVE
  cost = 0
}

export class AddMove {
  type = MoveType.ADD
  cost = 1
  char: string

  constructor(char: string) {
    this.char = char
  }
}

export class RemoveMove {
  type = MoveType.REMOVE
  cost = 1
}

export class ReplaceMove {
  type = MoveType.REPLACE
  cost = 1
  char: string

  constructor(char: string) {
    this.char = char
  }
}

/** A union type for any move */
export type Move = LeaveMove | AddMove | RemoveMove | ReplaceMove

export type MoveListNode = {
  /** The cumulative cost of the moves up until and including this move */
  cost: number
  move: Move
  previous: MoveListNode
}
