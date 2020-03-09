import { calculateMoves } from '../moves'
import { MoveType } from '../types/moves'

test('Edits horse -> ros as expected', () => {
  const moves = calculateMoves('horse', 'ros')
  expect(moves.map(m => m.type)).toMatchObject([
    MoveType.REPLACE,
    MoveType.LEAVE,
    MoveType.REMOVE,
    MoveType.LEAVE,
    MoveType.REMOVE
  ])
})

test('Edits from the empty string contain only add moves', () => {
  const moves = calculateMoves('', 'Hello World!')
  expect(moves.filter(m => m.type !== MoveType.ADD)).toHaveLength(0)
})

test('Edits to the empty string contain only remove moves', () => {
  const moves = calculateMoves('Hello World!', '')
  expect(moves.filter(m => m.type !== MoveType.REMOVE)).toHaveLength(0)
})

test('A single character change should be a replacement', () => {
  const moves = calculateMoves('a', 'b')
  expect(moves).toHaveLength(1)
  expect(moves[0].type).toBe(MoveType.REPLACE)
})

test.each([
  [
    "I need to let you know about the long test; it's very important",
    "This is a really really long test. I hope it isn't important",
    42
  ],
  ['happy happy happy boy', 'fally downy the hill', 16]
])(
  'An edit should be the same length as the levenshtein distance',
  (from, to, cost) => {
    const moves = calculateMoves(from, to)
    expect(moves.filter(m => m.type !== MoveType.LEAVE)).toHaveLength(cost)
  }
)
