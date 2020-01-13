class Move {
  constructor (type, orig, next) {
    this.type = type
    this.orig = orig
    this.next = next
  }
}

class Leave extends Move {
  constructor (char) {
    super('leave', char, char)
  }
}

class Add extends Move {
  constructor (char) {
    super('add', '', char)
  }
}

class Replace extends Move {
  constructor (cur, next) {
    super('replace', cur, next)
  }
}

class Remove extends Move {
  constructor (char) {
    super('remove', char, '')
  }
}

export default function edit (s1, s2) {
  const dp = new Array(s2.length + 1)
  var base = []
  var prev, next, i, j

  // initialise dp
  dp[0] = {
    moves: [],
    cost: 0
  }
  for (j = 1; j < s2.length + 1; j++) {
    base.push(new Add(s2[j - 1]))
    dp[j] = {
      moves: [...base],
      cost: j
    }
  }

  base = []

  for (i = 0; i < s1.length; i++) {
    prev = dp[0]
    base.push(new Remove(s1[i]))
    dp[0] = {
      moves: [...base],
      cost: i
    }
    for (j = 1; j < s2.length + 1; j++) {
      next = {}
      if (s1[i] === s2[j - 1]) {
        next = {
          moves: [...prev.moves, new Leave(s1[i])],
          cost: prev.cost
        }
      } else {
        next.cost = Math.min(
          dp[j - 1].cost,
          dp[j].cost,
          prev.cost
        )
        if (prev.cost === next.cost) {
          next.moves = [...prev.moves, new Replace(s1[i], s2[j - 1])]
        } else {
          var valid = []
          if (dp[j - 1].cost === next.cost) valid.push(new Add(s2[j - 1]))
          if (dp[j].cost === next.cost) valid.push(new Remove(s1[i]))

          const move = valid[Math.floor(Math.random() * valid.length)]

          if (move.type === 'add') next.moves = [...dp[j - 1].moves, move]
          else next.moves = [...dp[j].moves, move]
        }
      }
      prev = dp[j]
      dp[j] = next
    }
  }

  return dp[dp.length - 1].moves
}
