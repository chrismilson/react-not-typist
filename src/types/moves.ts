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
  static cost = -2
  type = MoveType.LEAVE
}

export class AddMove {
  static cost = 1
  type = MoveType.ADD
  char: string

  constructor(char: string) {
    this.char = char
  }
}

export class RemoveMove {
  static cost = 1
  type = MoveType.REMOVE
}

export class ReplaceMove {
  static cost = 1
  type = MoveType.REPLACE
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
