import {
  MoveType,
  LeaveMove,
  AddMove,
  RemoveMove,
  ReplaceMove
} from './types/moves'

/* Some move action creators */
export const leave = (): LeaveMove => ({
  type: MoveType.LEAVE
})

export const add = (char: string): AddMove => ({
  type: MoveType.ADD,
  char
})

export const remove = (): RemoveMove => ({
  type: MoveType.REMOVE
})

export const replace = (char: string): ReplaceMove => ({
  type: MoveType.REPLACE,
  char
})
